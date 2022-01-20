import { devtoolsExchange } from "@urql/devtools";
import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange, gql } from "urql";

const urqlClient = createClient({
  url: process.env.NEXT_PUBLIC_BACKEND_URL!,
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          DeletePost: (result: any, args, cache, info) => {
            cache.invalidate({ __typename: "Post", id: result.DeletePost.id});
          },
        },
      },
    }),
    fetchExchange,
  ],
  // requestPolicy: "network-only",
});

export default urqlClient;

