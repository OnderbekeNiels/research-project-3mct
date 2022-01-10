import CommentType from "./comment";
import UserType from "./user";

export default interface PostType {
  id: number;
  acceptedAnswerId: number | null;
  answerCount: number | null;
  body: string;
  closedDate: Date | null;
  commentCount: number | null;
  communityOwnedDate: string | null;
  creationDate: Date;
  favoriteCount: number | null;
  lastActivityDate: Date;
  lastEditDate: Date | null;
  lastEditorDisplayName: string | null;
  lastEditorUserId: number | null;
  ownerUserId: number | null;
  ownerUser?: UserType;
  parentId: number | null;
  postTypeId: number;
  score: number;
  tags: string | null;
  title: string | null;
  viewCount: number;
  votesCount: number;
  comments?: CommentType[];
}
