import React from "react";
import ContentBox from "./contentBox";

export interface LoadingMessageBoxArgs {
  message?: string;
}

export default function LoadingMessageBox({
  message = "Loading data",
}: LoadingMessageBoxArgs) {
  return (
    <ContentBox className="animate-pulse bg-teal-500">
      <p className="font-bold text-center text-white">{message}</p>
    </ContentBox>
  );
}
