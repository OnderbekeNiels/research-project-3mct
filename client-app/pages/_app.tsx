import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Layout from "../components/objects/layout";
import type { AppProps } from "next/app";
import { atom, RecoilRoot } from "recoil";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </ApolloProvider>
  );
}
export default MyApp;