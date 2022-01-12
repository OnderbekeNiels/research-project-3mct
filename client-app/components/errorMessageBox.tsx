import React from "react";
import ContentBox from "./contentBox";

export interface ErrorMessageBoxArgs{
    message?: string
}

export default function ErrorMessageBox({message="Something went wrong"}: ErrorMessageBoxArgs){
    return (
      <ContentBox className="bg-red-500">
        <p className="font-bold text-white text-center">{message}</p>
      </ContentBox>
    );
}