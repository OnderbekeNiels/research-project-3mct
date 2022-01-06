import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Posts";
import { User } from "./Users";

@Index("PK_Comments_Id", ["id"], { unique: true })
@ObjectType()
@Entity("Comments", { schema: "dbo" })
export class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field()
  @Column("datetime", { name: "CreationDate" })
  creationDate: string;

  @Field()
  @Column("int", { name: "PostId" })
  postId: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (p: Post) => p.id)
  @JoinColumn({ name: "PostId" })
  post: Post;

  @Field({ nullable: true })
  @Column("int", { name: "Score", nullable: true })
  score?: number | null;

  @Field()
  @Column("nvarchar", { name: "Text", length: 700 })
  text: string;

  @Field(() => ID, { nullable: true })
  @Column("int", { name: "UserId", nullable: true })
  userId?: number | null;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (u: User) => u.id, { nullable: true })
  @JoinColumn({ name: "UserId" })
  user?: User;
}
