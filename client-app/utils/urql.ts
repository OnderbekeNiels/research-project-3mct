import { devtoolsExchange } from "@urql/devtools";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from "urql";

const urqlClient = createClient({
  url: process.env.NEXT_PUBLIC_BACKEND_URL!,
  exchanges: [devtoolsExchange, dedupExchange, cacheExchange, fetchExchange],
  // requestPolicy: "network-only",
});

export default urqlClient;
