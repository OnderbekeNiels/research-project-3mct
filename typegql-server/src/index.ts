import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from "typeorm";
import { createDatabase } from "typeorm-extension";
import { UserResolver } from "./resolvers/user.resolver";

@Resolver()
class HelloResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hello World!";
  }
}

(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions();
  createConnection();
  // console.log({connectionOptions})

  // // Create the database before we make the connection. This will also add the tables
  // createDatabase({ ifNotExist: true }, connectionOptions)
    // .then(() => console.log("Database has been created!"))
    // .then(createConnection)
    // .then(async () => {

      const schema = await buildSchema({
        resolvers: [HelloResolver, UserResolver],
      });

      const apolloServer = new ApolloServer({ schema });

      const app = Express();

      await apolloServer.start();
      apolloServer.applyMiddleware({ app });

      app.listen(4000, () => {
        console.log("server started on http://localhost:4000/graphql");
      });
    // });
})();
