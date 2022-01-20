import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export default client