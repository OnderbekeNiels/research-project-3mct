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

  // Schema definition
  const typeDefs = gql`
    enum CacheControlScope {
      PUBLIC
      PRIVATE
    }

    directive @cacheControl(
      maxAge: Int
      scope: CacheControlScope
      inheritMaxAge: Boolean
    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

    type Userd @cacheControl(maxAge: 30) {
      id: ID!
      displayName: String
      location: String
    }

    type Query {
      UsersAlld: [Userd]
    }
  `;

  // Resolver map
  const resolvers = {
    Query: {
      UsersAlld(_: any, { id }: any, ctx: any, info: any) {
          console.log({ _ });
        console.log({ctx})
        console.log({ info });
        const repository = getRepository(User);
        // info.cacheControl.setCacheHint({ maxAge: 20, scope: "PUBLIC" });
        return repository.find({take: 2});
      },
    },
  };

  // ! Type gql way
  const schema = await buildSchema({
    resolvers: [UserResolver, CommentResolver, PostResolver],
    container: Container,
  });

  // SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
  //   sample: "@cacheControl(maxAge: 30)",
  // });

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
        password: "mqsdfhmjkjKJFapaekrJqq",
      }),
    }),
  });

  // const apolloServer = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  //   cache: new BaseRedisCache({
  //     client: new Redis({
  //       password: "mqsdfhmjkjKJFapaekrJqq",
  //     }),
  //   }),
  // });

  // ! Blank apollo express way
  // const apolloServer = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  //   plugins: [
  //     ApolloServerPluginCacheControl({
  //       // Cache everything for 0 second by default.
  //       defaultMaxAge: 10,
  //       // Don't send the `cache-control` response header.
  //       calculateHttpHeaders: false,
  //     }),
  //   ],
  // });

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
