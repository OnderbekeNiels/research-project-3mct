import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Comment from "../../components/comment";
import ContentBox from "../../components/contentBox";
import Container from "../../components/objects/container";
import { Head1, Head2 } from "../../components/objects/head";
import Row from "../../components/objects/row";
import Post, { PostArgs } from "../../components/post";
import CommentType from "../../models/comment";
import PostType from "../../models/post";
import { Anonymous } from "../../models/user";
import createMarkup from "../../utils/core";
import { formateDateToLongNotation, formatToDate } from "../../utils/date";
import { query } from "../../utils/fetch";
import formatTags from "../../utils/string";

export default function PostDetail() {
  const router = useRouter();
  const { postId } = router.query;

  const [post, setPost] = useState<PostType | undefined | null>(undefined);
  const [formatedTags, setFormatedTags] = useState<string[]>([]);
  const getPost = async (id: number) => {
    try {
      const data: PostType = await query(
        `PostById`,
        `query PostById($postId: Float!) {
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
      user {
        id
        displayName
      }
      creationDate
    }
  }
}`,
        { postId: id }
      );
      setPost(data);
      data.tags && setFormatedTags(formatTags(data.tags));
    } catch (error) {
      setPost(null);
    }
  };

  useEffect(() => {
    if (postId) getPost(+postId);
  }, [postId]);

  return (
    <>
      <Row>
        <Container>
          {post === null && <ContentBox>Something went wrong</ContentBox>}
          {post === undefined && <ContentBox>Loading</ContentBox>}
          {post && (
            <>
              <Head1>{post.title ? post.title : "Untiteld post"}</Head1>
              <ul className="flex space-x-4 text-sm">
                <li>
                  Asked
                  <span className="font-bold text-orange-600 ml-1">
                    {post.ownerUser
                      ? post.ownerUser.displayName
                      : Anonymous.name}
                  </span>
                </li>
                <li>
                  Viewed
                  <span className="font-bold text-orange-600 ml-1">
                    {post.viewCount}
                  </span>
                </li>
                <li>
                  Last edit
                  <span className="font-bold text-orange-600 ml-1">
                    {post.lastEditDate
                      ? formateDateToLongNotation(
                          formatToDate(post.lastEditDate)
                        )
                      : "Not available"}
                  </span>
                </li>
              </ul>
              <Post
                className="mt-6"
                post={post as PostArgs}
                detailMode={true}
              ></Post>
            </>
          )}
        </Container>
      </Row>
      {post && post.comments && post.comments.length > 0 && (
        <Row className="mt-4 sm:mt-6 md:mt-10">
          <Container>
            <Head2>Comments</Head2>
            <div className="grid gap-2">
              {post.comments.map((c: CommentType) => {
                return <Comment comment={c} key={c.id}></Comment>;
              })}
            </div>
          </Container>
        </Row>
      )}
    </>
  );
}
