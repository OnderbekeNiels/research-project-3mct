import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
  getRepository,
  useContainer,
} from "typeorm";
import { UserResolver } from "./resolvers/user.resolver";
import { Container } from "typedi";
import { CommentResolver } from "./resolvers/comment.resolver";
import { PostResolver } from "./resolvers/post.resolver";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import { User } from "./entity/Users";
import { ApolloServerPluginCacheControl } from "apollo-server-core";
import { BaseRedisCache } from "apollo-server-cache-redis";
import { logger } from "./utils/logger";
import { Response } from "express";
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
          calculateHttpHeaders: false,
        }),
      ],
    context: ({ req, res }) => ({
      req,
      res,
      redisClient: new Redis({
        password: "mqsdfhmjkjKJFapaekrJqq",
      }),
    }),
  });

  // bron: https://gist.github.com/benawad/7abb41c179b050b476fdad4e5a561161
  const app = Express();

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
