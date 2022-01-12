import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Layout from "../components/objects/layout";

import type { AppProps } from "next/app";
import app from "../utils/firebase";
import { atom, RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
