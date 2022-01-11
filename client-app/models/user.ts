import BadgeType from "./badge";
import CommentType from "./comment";
import PostType from "./post";

export default interface UserType {
  id: number;
  aboutMe: string | null;
  age: number | null;
  creationDate: string;
  displayName: string;
  downVotes: number;
  emailHash: string | null;
  lastAccessDate: Date;
  location: string | null;
  reputation: number;
  upVotes: number;
  views: number;
  websiteUrl: string | null;
  accountId: number | null;
    badges?: BadgeType[];
  comments?: CommentType[];
  posts?: PostType[];
}

export class Anonymous {
  name = "Anonymous"
}
