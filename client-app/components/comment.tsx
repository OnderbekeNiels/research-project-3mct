import React from "react";
import CommentType from "../models/comment";
import { Anonymous } from "../models/user";
import ContentBox from "./contentBox";

export default function Comment({comment}: {comment: CommentType}) {
    return (
      <ContentBox className="text-sm">
        <p className="inline">{comment.text}</p>
        <p className="inline ml-1">
          -{" "}
          <span className="font-bold text-orange-600">
            {comment.user ? comment.user?.displayName : Anonymous.name}
          </span>
          <span className="text-gray-500 ml-1">
            at {new Date(comment.creationDate).toDateString()}
          </span>
        </p>
      </ContentBox>
    );
}