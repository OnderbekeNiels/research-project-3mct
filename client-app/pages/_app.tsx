import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Layout from "../components/objects/layout";

import type { AppProps } from "next/app";
import app from "../utils/firebase";
import { atom, RecoilRoot } from "recoil";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import client from "../utils/apollo";
import { Provider } from "urql";
import urqlClient from "../utils/urql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={urqlClient}>
      <ApolloProvider client={client}>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </ApolloProvider>
    </Provider>
  );
}
export default MyApp;
