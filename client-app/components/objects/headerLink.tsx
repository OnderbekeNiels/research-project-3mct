import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export interface HeaderLinkArgs {
  children: any;
  href?: string;
}

export default function HeaderLink({ href = "/", children }: HeaderLinkArgs) {
  const { asPath } = useRouter();
  const isCurrentTab = asPath === href;
  return (
    <Link href={`${href}`}>
      <a
        className={`px-4 py-1 rounded-full text-lg font-semibold ${
          isCurrentTab && "text-white bg-sky-500"
        }`}
      >
        {children}
      </a>
    </Link>
  );
}
