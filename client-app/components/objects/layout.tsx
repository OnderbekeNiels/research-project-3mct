import React from "react";
import RequestMetrics from "../requestMetrics";
import Header from "./header";
import SubNav from "./subNav";

export default function Layout({ children }: any) {
  return (
    <>
        <Header />
        <SubNav />
        <main className="max-w-5xl mx-auto w-full relative top-[5rem] pb-10">{children}</main>
    </>
  );
}
