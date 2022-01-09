import React from "react";
import ContentBox from "./contentBox";
import NumberBox from "./numberBox";
import { Head2 } from "./objects/head";
import Tag from "./tag";

export interface PostType {
  votesCount: number;
  answerCount: number;
  title: string;
  body: string;
  ownerUser: string;
  tags: string;
}

export default function Post() {
  const post: PostType = {
    votesCount: 0,
    answerCount: 0,
    title: "no title",
    body: "<p>I want to use a track-bar to change a form's opacity.</p>  <p>This is my code:</p>  <pre><code>decimal trans = trackBar1.Value / 5000; this.Opacity = trans; </code></pre>  <p>When I build the application, it gives the following error:</p>  <blockquote>   <p>Cannot implicitly convert type <code>'decimal'</code> to <code>'double'</code>.</p> </blockquote>  <p>I tried using <code>trans</code> and <code>double</code> but then the control doesn't work. This code worked fine in a past VB.NET project.</p>",
    ownerUser: "Joe",
    tags: "<p>I want to use a track-bar to change a form's opacity.</p>  <p>This is my code:</p>  <pre><code>decimal trans = trackBar1.Value / 5000; this.Opacity = trans; </code></pre>  <p>When I build the application, it gives the following error:</p>  <blockquote>   <p>Cannot implicitly convert type <code>'decimal'</code> to <code>'double'</code>.</p> </blockquote>  <p>I tried using <code>trans</code> and <code>double</code> but then the control doesn't work. This code worked fine in a past VB.NET project.</p> ",
  };

  const {
    votesCount,
    answerCount,
    title,
    body,
    ownerUser,
    tags,
  } = post

  return (
    <ContentBox className="grid grid-cols-[auto_1fr_auto_auto] gap-4">
      <div className="grid gap-2 -ml-2 -my-2">
        <NumberBox
          value={votesCount}
          description="votes"
          bgColor="bg-blue-500"
          textColor="text-white"
        ></NumberBox>
        <NumberBox
          value={answerCount}
          description="answers"
          bgColor="bg-teal-500"
          textColor="text-white"
        ></NumberBox>
      </div>
      <div className="text-gray-900">
        <Head2>{title}</Head2>
        <p>
          {body}
        </p>
        <p className="mt-2 text-sm">
          asked by <span className="font-bold text-orange-600">{ownerUser}</span>
        </p>
      </div>
      <hr className="bg-gray-300 h-full border-2"></hr>
      <div className="max-w-[6rem] flex flex-wrap gap-2 content-start">
        <Tag tagName="C#"></Tag>
        <Tag tagName="Docker"></Tag>
        <Tag tagName="DevOps"></Tag>
        <Tag tagName="K8"></Tag>
      </div>
    </ContentBox>
  );
}
