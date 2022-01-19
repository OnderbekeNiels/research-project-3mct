import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Layout from "../components/objects/layout";
import type { AppProps } from "next/app";
import app from "../utils/firebase";
import { atom, RecoilRoot } from "recoil";
import React from "react";
import { Provider } from "urql";
import urqlClient from "../utils/urql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={urqlClient}>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
    </Provider>
  );
}
export default MyApp;
