import Link from "next/link";
import React, { useState } from "react";
import RequestMetrics from "../requestMetrics";
import HeaderLink from "./headerLink";

export default function Header() {
  const [showMetrics, setShowMetrics] = useState<boolean>(false);

  return (
    <>
      <header className="grid place-items-center p-5 shadow-md bg-white/75 backdrop-blur-xl text-gray-900 fixed top-0 right-0 left-0 z-50 peer">
        <div className="max-w-5xl w-full flex items-center justify-between px-4 sm:px-6 relative">
          <Link href="/">
            <a className="flex items-center justify-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10"
                viewBox="0 0 40.517 48"
              >
                <g
                  id="Group_1"
                  data-name="Group 1"
                  transform="translate(-22.6 -14.9)"
                >
                  <path
                    id="Path_10"
                    data-name="Path 10"
                    d="M56.854,83.459V70.6h4.268V87.727H22.6V70.6h4.268V83.459Z"
                    transform="translate(0 -24.827)"
                    fill="#bcbbbb"
                  />
                  <path
                    id="Path_11"
                    data-name="Path 11"
                    d="M38.443,44.554l20.952,4.379.887-4.212L39.33,40.341Zm2.771-9.977,19.4,9.035,1.774-3.88-19.4-9.09-1.774,3.935Zm5.376-9.533L63.053,38.734l2.716-3.27L49.307,21.773l-2.716,3.27ZM57.233,14.9,53.8,17.45,66.545,34.632l3.436-2.55ZM38,54.309H59.395V50.041H38Z"
                    transform="translate(-6.864)"
                    fill="#f48023"
                  />
                </g>
              </svg>
              <div className="text-xl flex items-center space-x-1">
                <p>stack</p>
                <p className="font-bold">overflow</p>
                <p className="font-thin text-sm">(research edition)</p>
              </div>
            </a>
          </Link>
          <ul className="flex space-x-2 items-center relative">
            <li>
              <HeaderLink href="/posts">Posts</HeaderLink>
            </li>
            <li>
              <HeaderLink href="/users">Users</HeaderLink>
            </li>
          </ul>
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="p-1 rounded-b-md bg-gray-800 absolute right-6 -bottom-12 z-10"
          >
            {!showMetrics ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>
        </div>
      </header>
      <RequestMetrics isVisible={showMetrics}></RequestMetrics>
    </>
  );
}
