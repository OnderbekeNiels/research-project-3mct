import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";

const linkChain = createPersistedQueryLink({ sha256, useGETForHashedQueries: true }).concat(
  new HttpLink({ uri: "http://localhost:4000/graphql" })
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: linkChain,
});

export default client