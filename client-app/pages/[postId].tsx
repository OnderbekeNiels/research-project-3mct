import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Comment from "../components/comment";
import ContentBox from "../components/contentBox";
import Container from "../components/objects/container";
import { Head1, Head2 } from "../components/objects/head";
import Row from "../components/objects/row";
import Tag from "../components/tag";
import CommentType from "../models/comment";
import PostType from "../models/post";
import { Anonymous } from "../models/user";
import createMarkup from "../utils/core";
import { query } from "../utils/fetch";
import formatTags from "../utils/string";

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
    body
      ownerUser {
      displayName
    }
    tags
    title
    viewCount
    comments {
      text
      user {
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
  }, []);

  return (
    <>
      <Row>
        <Container>
          {post === null && <ContentBox>Something went wrong</ContentBox>}
          {post === undefined && <ContentBox>Loading</ContentBox>}
          {post && (
            <>
              {" "}
              <Head1>{post.title}</Head1>
              <ul className="flex space-x-4">
                <li>
                  Asked{" "}
                  <span className="font-bold text-orange-600 ml-1">
                    {post.ownerUser
                      ? post.ownerUser.displayName
                      : Anonymous.name}
                  </span>
                </li>
                <li>
                  Viewed{" "}
                  <span className="font-bold text-orange-600 ml-1">{post.viewCount}</span>
                </li>
              </ul>
              <ContentBox className="mt-6 post-detail">
                <Head2>Description</Head2>
                <div
                  className="leading-5"
                  dangerouslySetInnerHTML={createMarkup(post.body)}
                ></div>
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
              </ContentBox>
            </>
          )}
        </Container>
      </Row>
      {post && post.comments && post.comments.length > 0 && (
        <Row>
          <Container>
            <Head2>Comments</Head2>
            <div className="grid gap-2">
              {post.comments.map((c: CommentType) => {
                return <Comment comment={c}></Comment>;
              })}
            </div>
          </Container>
        </Row>
      )}
    </>
  );
}
