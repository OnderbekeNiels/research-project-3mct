import { formateDateToLongNotation, formatToDate } from "../utils/date";

export interface PostRowArgs {
  id?: number;
  answerCount: number | null;
  title: string | null;
  acceptedAnswerId: number | null;
  lastEditDate: string | null;
}

export default function PostRow({
  title,
  answerCount,
  acceptedAnswerId,
  lastEditDate,
}: PostRowArgs) {
  return (
    <div className="grid grid-cols-[auto_auto_1fr_auto] gap-4 items-center bg-orange-50 p-2 rounded-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ${
          acceptedAnswerId === 0 ? "text-gray-600" : "text-green-600"
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
      <div className="px-2 py-0.5 bg-green-600 text-white rounded-md">
        {answerCount}
      </div>
      <p>{title}</p>
      <p>
        {lastEditDate && formateDateToLongNotation(formatToDate(lastEditDate))}
      </p>
    </div>
  );
}
