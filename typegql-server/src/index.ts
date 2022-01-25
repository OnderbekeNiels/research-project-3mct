import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
  useContainer,
} from "typeorm";
import { UserResolver } from "./resolvers/user.resolver";
import { Container } from "typedi";
import { CommentResolver } from "./resolvers/comment.resolver";
import { PostResolver } from "./resolvers/post.resolver";
import { ApolloServerPluginCacheControl } from "apollo-server-core";
import { logger } from "./utils/logger";
import cors = require("cors");
const Redis = require("ioredis");

useContainer(Container);

(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions();
  createConnection();

  // ! Type gql way
  const schema = await buildSchema({
    resolvers: [UserResolver, CommentResolver, PostResolver],
    container: Container,
  });

  // todo: redis password as env
  const apolloServer = new ApolloServer({
    schema,
      plugins: [
        ApolloServerPluginCacheControl({
          // Cache everything for 1 hour by default.
          defaultMaxAge: 3600,
          // Send the `cache-control` response header.
          calculateHttpHeaders: true,
        }),
      ],
    context: ({ req, res }) => ({
      req,
      res,
      redisClient: new Redis({
        host: "redis",
        password: process.env.REDIS_PASSWORD,
      }),
    }),
  });

  // bron: https://gist.github.com/benawad/7abb41c179b050b476fdad4e5a561161
  const app = express();

  app.use(cors());

  app.use("/graphql*", (req, res, next) => {
    const startHrTime = process.hrtime();

    res.on("finish", () => {
      if (req.body) {
        if (
          req.body.operationName &&
          req.body.operationName == "IntrospectionQuery"
        )
          return;
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs =
          elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        logger.info({
          type: "timing",
          method: req.method,
          name: req.body.operationName || "persisted query",
          ms: elapsedTimeInMs,
        });
      }
    });

    next();
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("🧙‍♂️ server started on http://localhost:4000/graphql");
  });
  // });
})();
