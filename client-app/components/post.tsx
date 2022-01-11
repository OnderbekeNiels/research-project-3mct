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
  votesCount: number;
  answerCount: number;
  title: string;
  body: string;
  ownerUser: UserType;
  tags: string;
}

export default function Post({
  post,
  detailMode = false,
  className = ""
}: {
  post: PostArgs;
  detailMode?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [formatedTags, setFormatedTags] = useState<string[]>(
    formatTags(post.tags)
  );

  return (
    <ContentBox
      onClick={() => {
        !detailMode && router.push(`/${post.id}`);
      }}
      className={`grid grid-cols-[auto_1fr] gap-4 ${
        !detailMode && "hover:shadow-lg cursor-pointer"
      }  ${className}`}
    >
      {!detailMode && (
        <div className="grid gap-2 -ml-2 -my-2">
          <NumberBox
            //   value={post.votesCount}
            value={post.votesCount}
            description="votes"
            bgColor="bg-sky-500"
            textColor="text-white"
          ></NumberBox>
          <NumberBox
            value={post.answerCount}
            description="answers"
            bgColor="bg-teal-500"
            textColor="text-white"
          ></NumberBox>
        </div>
      )}

      <div className="text-gray-900">
        <Head2>
          {detailMode
            ? "Description"
            : post.title
            ? post.title
            : "Untiteld post"}
        </Head2>
        <div
          className={`leading-5 max-w-1/3 ${
            detailMode ? "post-detail" : "max-h-20 overflow-y-hidden hover:overflow-y-auto"
          }`}
          dangerouslySetInnerHTML={createMarkup(post.body)}
        ></div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            post.ownerUser && router.push(`/users/${post.ownerUser.id}`);
          }}
        >
          <div className="mt-4 text-sm flex bg-orange-50 px-2 py-1 rounded-md max-w-max">
            <p>Asked by</p>
            <span className="font-bold text-orange-600 ml-1">
              {post.ownerUser ? post.ownerUser.displayName : Anonymous.name}
            </span>
            {post.ownerUser && (
              <ul className="flex space-x-2 ml-2">
                <li className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-sky-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{post.ownerUser.upVotes}</p>
                </li>
                <li className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-rose-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{post.ownerUser.downVotes}</p>
                </li>
                <li className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-orange-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{post.ownerUser.reputation}</p>
                </li>
              </ul>
            )}
          </div>
        </button>
        {formatedTags.length > 0 && (
          <>
            <hr className="bg-gray-300 w-full my-2 rounded-md"></hr>
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
