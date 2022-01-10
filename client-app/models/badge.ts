import UserType from "./user";

export default interface BadgeType{
  id: number;
  name: string;
  userId: number;
  user: UserType;
  date: Date;
}