import { gql, useMutation } from "@apollo/client";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentBox from "../../components/contentBox";
import Container from "../../components/objects/container";
import { Head1 } from "../../components/objects/head";
import Row from "../../components/objects/row";
import StatusBar from "../../components/statusBar";

export default function CreatePost() {
  interface CreatePost {
    title: string;
    body: string;
  }
  const router = useRouter();
  const [post, setPost] = useState<CreatePost>({
    title: "I tried this mutation....",
    body: "Hope it works",
  });

  const CREATEPOST = gql`
    mutation CreatePost($data: PostInput!) {
      CreatePost(data: $data) {
        id
      }
    }
  `;

  const [addPost, { data, error, loading }] = useMutation(CREATEPOST, {
    fetchPolicy: "no-cache",
  });


  useEffect(() => {
    if (data != undefined) {
      console.log({ data });
      router.push(`/posts/${data.CreatePost.id}`);
    }
  }, [data]);

  return (
    <Row>
      <Container>
        <Head1>Create a post</Head1>
        {error && (
          <StatusBar
            level="error"
            message="Something went wrong while creating."
          />
        )}
        {data && <StatusBar level="ok" message="Created succesfully" />}
        <ContentBox>
          <form
            action=""
            className="grid gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              addPost({
                variables: {
                  data: {
                    body: post.body,
                    creationDate: new Date().toISOString(),
                    lastActivityDate: new Date().toISOString(),
                    lastEditDate: new Date().toISOString(),
                    ownerUserId: 1,
                    postTypeId: 1,
                    score: 2,
                    title: post.title,
                    viewCount: 0,
                    votesCount: 0,
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
                  setPost((p: CreatePost) => {
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
                  setPost((p: CreatePost) => {
                    return { ...p, body: e.target.value };
                  });
                }}
              ></textarea>
            </div>
            <button
              className="outline-none p-2 rounded-md $max-w-min justify-self-end bg-orange-600 text-white  hover:bg-orange-600/0 border-2 border-orange-600 hover:text-orange-600 focus:ring-2 ring-orange-600/50"
              type="submit"
            >
              Create
            </button>
          </form>
        </ContentBox>
      </Container>
    </Row>
  );
}
