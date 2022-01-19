import { devtoolsExchange } from "@urql/devtools";
import { createClient, defaultExchanges } from "urql";

const urqlClient = createClient({
  url: process.env.NEXT_PUBLIC_BACKEND_URL!,
  exchanges: [devtoolsExchange, ...defaultExchanges],
});

export default urqlClient;
