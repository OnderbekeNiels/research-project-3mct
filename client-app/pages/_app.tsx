import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Layout from "../components/objects/layout";

import type { AppProps } from "next/app";
import app from "../utils/firebase";
import { atom, RecoilRoot } from "recoil";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL,
    cache: new InMemoryCache(),
  });

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
