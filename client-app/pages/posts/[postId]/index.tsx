import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Comment from "../../../components/comment";
import ErrorMessageBox from "../../../components/errorMessageBox";
import LoadingMessageBox from "../../../components/loadingMessageBox";
import Container from "../../../components/objects/container";
import { Head1, Head2 } from "../../../components/objects/head";
import Row from "../../../components/objects/row";
import Post, { PostArgs } from "../../../components/post";
import CommentType from "../../../models/comment";
import { Anonymous } from "../../../models/user";
import { formateDateToLongNotation, formatToDate } from "../../../utils/date";
import { requestState } from "../../../utils/store";

export default function PostDetail() {
  const router = useRouter();
  const { postId } = router.query;

  const [request, setRequest] = useRecoilState(requestState);

  const [start, setStart] = useState(new Date().getTime());

  const GETPOSTBYID = gql`query PostById($postId: Float!) {
  PostById(postId: $postId) {
        id
    answerCount
    communityOwnedDate
    lastEditDate
    body
      ownerUser {
        id
        displayName
        upVotes
        downVotes
        reputation
    }
    tags
    title
    viewCount
    comments {
      id
      text
      creationDate
      user {
        id
        displayName
      }
      creationDate
    }
  }
}`;
  const { loading, error, data } = useQuery(GETPOSTBYID, {
    variables: { postId: postId  ? +postId : undefined}, 
    fetchPolicy: "no-cache",
  
  });


  useEffect(() => {
    if (data != undefined) {
      setRequest((d) => {
        return {
          ...d,
          requestName: "PostById",
          requestNestingLevel: 3,
          responseSize:
            new TextEncoder().encode(JSON.stringify(data)).length / 1024,
          responseTime: new Date().getTime() - start,
        };
      });
    }
  }, [data]);


  return (
    <>
      <Row>
        <Container>
          {error && <ErrorMessageBox />}
          {loading && <LoadingMessageBox />}
          {data && (
            <>
              <Head1>
                {data.PostById.title ? data.PostById.title : "Untiteld post"}
              </Head1>
              <ul className="flex space-x-4 text-sm">
                <li>
                  Asked
                  <span className="font-bold text-orange-600 ml-1">
                    {data.PostById.ownerUser
                      ? data.PostById.ownerUser.displayName
                      : Anonymous.name}
                  </span>
                </li>
                <li>
                  Viewed
                  <span className="font-bold text-orange-600 ml-1">
                    {data.PostById.viewCount}
                  </span>
                </li>
                <li>
                  Last edit
                  <span className="font-bold text-orange-600 ml-1">
                    {data.PostById.lastEditDate
                      ? formateDateToLongNotation(
                          formatToDate(data.PostById.lastEditDate)
                        )
                      : "Not available"}
                  </span>
                </li>
              </ul>
              <Post
                className="mt-6"
                post={data.PostById as PostArgs}
                detailMode={true}
              ></Post>
            </>
          )}
        </Container>
      </Row>
      {data && data.PostById.comments && data.PostById.comments.length > 0 && (
        <Row className="mt-4 sm:mt-6 md:mt-10">
          <Container>
            <Head2>Comments</Head2>
            <div className="grid gap-2">
              {data.PostById.comments.map((c: CommentType) => {
                return <Comment comment={c} key={c.id}></Comment>;
              })}
            </div>
          </Container>
        </Row>
      )}
    </>
  );
}
