import PostType from "./post";
import UserType from "./user";

export default interface CommentType{
  id: number;
  creationDate: string;
  postId: number;
  post: PostType;
  score?: number | null;
  text: string;
  userId?: number | null;
  user?: UserType;
}