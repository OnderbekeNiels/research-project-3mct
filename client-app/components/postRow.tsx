import { useRouter } from "next/router";
import CommentType from "../models/comment";
import { formateDateToLongNotation, formatToDate } from "../utils/date";
import Comment from "./comment";

export interface PostRowArgs {
  id: number;
  answerCount: number | null;
  title: string | null;
  acceptedAnswerId: number | null;
  lastEditDate: string | null;
  comments?: CommentType[] | null;
}

export default function PostRow({id,
  title,
  answerCount,
  acceptedAnswerId,
  lastEditDate,
  comments
}: PostRowArgs) {

  const router = useRouter()
  return (
    <button
      onClick={() => {
        router.push(`/posts/${id}`);
      }}
      className="grid grid-cols-[1.5rem_3rem_1fr_auto] gap-4 items-center bg-orange-50 p-2 rounded-md text-left relative group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ${
          acceptedAnswerId === 0 ? "text-gray-600" : "text-teal-600"
        } `}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      </svg>
      <div className="px-2 py-0.5 bg-teal-600 text-white rounded-md text-center">
        {answerCount}
      </div>
      <p>{title ? title : "Untitled"}</p>
      <p>
        {lastEditDate && formateDateToLongNotation(formatToDate(lastEditDate))}
      </p>
      {comments && comments.length != 0 && (
        <div className="bg-white/50 backdrop-blur-xl p-2 absolute hidden -right-2 top-2 rounded-md shadow-md z-10 group-hover:block max-h-48 overflow-auto">
          <ul className="grid gap-2">
            {comments.map((c: CommentType) => {
              return <Comment comment={c} key={c.id}></Comment>;
            })}
          </ul>
        </div>
      )}
    </button>
  );
}
