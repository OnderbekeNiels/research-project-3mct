import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentBox from "../../../components/contentBox";
import Container from "../../../components/objects/container";
import { Head1 } from "../../../components/objects/head";
import Row from "../../../components/objects/row";
import StatusBar from "../../../components/statusBar";

export default function () {
  const router = useRouter();
  const { postId } = router.query;

  interface EditPost {
    id: number;
    title: string;
    body: string;
  }

  const [post, setPost] = useState<EditPost>({ id: 0, title: "", body: "" });
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const GETPOSTBYID = gql`
    query PostById($postId: Float!) {
      PostById(postId: $postId) {
        id
        title
        body
      }
    }
  `;

  const [getPostById, { loading, error, data }] = useLazyQuery(GETPOSTBYID, {
    fetchPolicy: "no-cache",
  });

  const UPDATEPOST = gql`
    mutation UpdatePost($data: PostUpdate!, $postId: Float!) {
      UpdatePost(data: $data, postId: $postId) {
        id
        title
        body
      }
    }
  `;

  const [updatePost, response] = useMutation(UPDATEPOST, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data != undefined) {
      setPost(data.PostById);
    }
  }, [data]);

  useEffect(() => {
    if (postId)
      getPostById({
        variables: { postId: +postId },
      });
  }, [postId]);

  return (
    <Row>
      <Container>
        <Head1>Edit post {postId}</Head1>
        {response.error && (
          <StatusBar
            level="error"
            message="Something went wrong while updating."
          />
        )}
        {response.data && (
          <StatusBar level="ok" message="Updated succesfully." />
        )}
        <ContentBox>
          <form
            action=""
            className="grid gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              updatePost({
                variables: {
                  postId: postId && +postId,
                  data: {
                    body: post.body,
                    title: post.title,
                  },
                },
              });
            }}
          >
            <div className="grid gap-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="border-2 outline-none border-gray-300 active:border-orange-600 focus:border-orange-600 focus:ring-2 ring-orange-600/50 rounded-md p-1 max-w-xl"
                placeholder="I have this problem where..."
                value={post && post.title}
                onChange={(e: any) => {
                  setIsEdited(true);
                  setPost((p: EditPost) => {
                    return { ...p, title: e.target.value };
                  });
                }}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description">Descripiton</label>
              <textarea
                name="description"
                id="description"
                className="border-2 outline-none border-gray-300 active:border-orange-600 focus:border-orange-600 focus:ring-2 ring-orange-600/50 rounded-md p-1 max-w-xl"
                placeholder="When i run this code..."
                value={post && post.body}
                onChange={(e: any) => {
                  setIsEdited(true);
                  setPost((p: EditPost) => {
                    return { ...p, body: e.target.value };
                  });
                }}
              ></textarea>
            </div>
            <button
              className={`outline-none p-2 rounded-md $max-w-min justify-self-end ${
                isEdited
                  ? "bg-orange-600 text-white  hover:bg-orange-600/0 border-2 border-orange-600 hover:text-orange-600 focus:ring-2 ring-orange-600/50"
                  : "bg-gray-200 text-gray-500"
              } `}
              type="submit"
              disabled={!isEdited}
            >
              Save
            </button>
          </form>
        </ContentBox>
      </Container>
    </Row>
  );
}
