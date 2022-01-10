import { useRouter } from "next/router";
import React, { useState } from "react";
import UserType, { Anonymous } from "../models/user";
import createMarkup from "../utils/core";
import formatTags from "../utils/string";
import ContentBox from "./contentBox";
import NumberBox from "./numberBox";
import { Head2 } from "./objects/head";
import Tag from "./tag";

export interface PostArgs {
  id: number;
  votesCount?: number;
  answerCount: number;
  title: string;
  body: string;
  ownerUser: UserType;
  tags: string;
}

export default function Post({ post }: { post: PostArgs }) {
  const router = useRouter();
  const [formatedTags, setFormatedTags] = useState<string[]>(
    formatTags(post.tags)
  );

  return (
    <ContentBox
      onClick={() => {
        router.push(`/${post.id}`);
      }}
      className="grid grid-cols-[auto_1fr] gap-4 hover:shadow-lg cursor-pointer"
    >
      <div className="grid gap-2 -ml-2 -my-2">
        <NumberBox
          //   value={post.votesCount}
          value={0}
          description="votes"
          bgColor="bg-blue-500"
          textColor="text-white"
        ></NumberBox>
        <NumberBox
          value={post.answerCount}
          description="answers"
          bgColor="bg-teal-500"
          textColor="text-white"
        ></NumberBox>
      </div>
      <div className="text-gray-900">
        <Head2>{post.title}</Head2>
        <div
          className="leading-5 overflow-hidden max-h-16"
          dangerouslySetInnerHTML={createMarkup(post.body)}
        ></div>
        <p className="mt-2 text-sm">
          asked by
          <span className="font-bold text-orange-600 ml-1">
            {post.ownerUser ? post.ownerUser.displayName : Anonymous.name}
          </span>
        </p>
        {formatedTags.length > 0 && (
          <>
            <hr className="bg-gray-300 w-full border-2 my-2"></hr>
            <div className="w-full flex flex-wrap gap-2 content-start">
              {formatedTags.map((t: string) => (
                <Tag tagName={t} key={t}></Tag>
              ))}
            </div>
          </>
        )}
      </div>
    </ContentBox>
  );
}
