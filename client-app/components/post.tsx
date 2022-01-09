import React from "react";
import ContentBox from "./contentBox";
import NumberBox from "./numberBox";
import { Head2 } from "./objects/head";

export default function Post() {
  return (
    <ContentBox className="grid grid-cols-[auto_1fr_auto] gap-4">
      <div className="grid gap-4">
        <NumberBox
          value={0}
          description="votes"
          bgColor="blue-500"
          textColor="white"
        ></NumberBox>
        <NumberBox
          value={150}
          description="answers"
          bgColor="blue-500"
          textColor="white"
        ></NumberBox>
      </div>
      <div>
        <Head2>How to make a link open in the default browser in C#?</Head2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          laboriosam laborum distinctio quas explicabo beatae autem reiciendis
          maiores ipsam excepturi. Saepe dolore debitis repellat blanditiis?
          Reiciendis voluptates porro hic in.
        </p>
        <p>
          asked by <span>Shiba01</span>
        </p>
      </div>
      <div>labels...</div>
    </ContentBox>
  );
}
