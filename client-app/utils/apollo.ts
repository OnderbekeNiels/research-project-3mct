import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";

const linkChain = createPersistedQueryLink({ sha256, useGETForHashedQueries: true }).concat(
  new HttpLink({ uri: process.env.NEXT_PUBLIC_BACKEND_URL })
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: linkChain,
});

export default client