import { useState } from "react";
import ContentBox from "../../components/contentBox";
import Container from "../../components/objects/container";
import { Head1 } from "../../components/objects/head";
import Row from "../../components/objects/row";

export default function CreatePost() {
  interface CreatePost {
    title: string;
    body: string;
  }
  const [post, setPost] = useState<CreatePost>({ title: "", body: "" });

  return (
    <Row>
      <Container>
        <Head1>Create a post</Head1>
        <ContentBox>
          <form action="" className="grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="border-2 outline-none border-gray-300 active:border-orange-600 focus:border-orange-600 focus:ring-2 ring-orange-600/50 rounded-md p-1 max-w-xl"
                placeholder="I have this problem where..."
                defaultValue={""}
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
                defaultValue={""}
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
