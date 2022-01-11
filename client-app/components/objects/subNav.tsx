import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Container from "./container";

const convertToPathArr = (path: string): string[] => {
  return path.split("/").filter((n) => n);
};

export default function SubNav() {
  const { asPath } = useRouter();
  const paths = convertToPathArr(asPath);

  return (
    <Container>
      <ul className="max-w-5xl mx-auto relative top-[5rem] w-full flex space-x-2 items-center my-4">
        {paths.map((p: string) => {
          return (
            <li>
              <Link href={p === paths[paths.length - 1] ? `/${asPath}` : `/${p}`}>
                <a
                  className={`py-1 px-4 rounded-full font-semibold ${
                    p === paths[paths.length - 1] && "bg-teal-500 text-white cursor-default"
                  }`}
                >
                  {p.toLocaleUpperCase()}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
