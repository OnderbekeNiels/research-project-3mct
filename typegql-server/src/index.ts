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
const Redis = require('ioredis');


useContainer(Container);

(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions();
  createConnection();

  // Schema definition
  // const typeDefs = gql`
  //   enum CacheControlScope {
  //     PUBLIC
  //     PRIVATE
  //   }

  //   directive @cacheControl(
  //     maxAge: Int
  //     scope: CacheControlScope
  //     inheritMaxAge: Boolean
  //   ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  //   type User @cacheControl(maxAge: 30) {
  //     id: ID!
  //     displayName: String
  //     location: String
  //   }

  //   type Query {
  //     UsersAll: [User]
  //   }
  // `;

  
  // // Resolver map
  // const resolvers = {
  //   Query: {
  //     UsersAll(_: any, { id }: any, ctx: any, info: any) {
  //         console.log({ _ });
  //       console.log({ctx})
  //       console.log({ info });
  //       const repository = getRepository(User);
  //       // info.cacheControl.setCacheHint({ maxAge: 20, scope: "PUBLIC" });
  //       return repository.find({take: 2});
  //     },
  //   },
  // };

  // ! Type gql way
  const schema = await buildSchema({
    resolvers: [UserResolver, CommentResolver, PostResolver],
    container: Container,
  });

  // todo: redis password as env
  const apolloServer = new ApolloServer({
    schema,
    context:{
      redisClient: new Redis({
        password: "mqsdfhmjkjKJFapaekrJqq",
      }),
    },
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

  const app = Express();

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
  // });
})();
