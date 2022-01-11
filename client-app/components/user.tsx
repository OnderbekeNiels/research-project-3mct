import { useRouter } from "next/router";
import React from "react";
import ContentBox from "./contentBox";
import { Head3 } from "./objects/head";

export interface UserArgs {
  id?: number;
  displayName: string;
  upVotes: number;
  downVotes: number;
  reputation: number;
}

export default function User({
  displayName,
  upVotes,
  downVotes,
  reputation,
  id,
}: UserArgs) {
  const router = useRouter();
  return (
    <ContentBox
      onClick={() => {
        if (id) router.push(`/users/${id}`);
      }}
      className={`grid grid-cols-[auto_1fr_auto] gap-4 items-center ${id && "cursor-pointer hover:shadow-lg"}`}
    >
      <div className="aspect-square w-8 rounded-full grid place-items-center bg-orange-50 border-2 border-orange-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-1/2 text-orange-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <Head3>{displayName}</Head3>
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
          <p>{upVotes}</p>
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
          <p>{downVotes}</p>
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
          <p>{reputation}</p>
        </li>
      </ul>
    </ContentBox>
  );
}
