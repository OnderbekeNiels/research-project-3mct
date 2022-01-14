import { Directive, Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comments";
import { User } from "./Users";

@Directive("@cacheControl(maxAge: 69)")
@Index("PK_Posts_Id", ["id"], { unique: true })
@ObjectType()
@Entity("Posts", { schema: "dbo" })
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field({ nullable: true })
  @Column("int", { name: "AcceptedAnswerId", nullable: true })
  acceptedAnswerId: number | null;

  @Field({ nullable: true })
  @Column("int", { name: "AnswerCount", nullable: true })
  answerCount: number | null;

  @Field()
  @Column("nvarchar", { name: "Body" })
  body: string;

  @Field({ nullable: true })
  @Column("datetime", { name: "ClosedDate", nullable: true })
  closedDate: string | null;

  @Field({ nullable: true })
  @Column("int", { name: "CommentCount", nullable: true })
  commentCount: number | null;

  @Field({ nullable: true })
  @Column("datetime", { name: "CommunityOwnedDate", nullable: true })
  communityOwnedDate: string | null;

  @Column("datetime", { name: "CreationDate" })
  creationDate: string;

  @Field({ nullable: true })
  @Column("int", { name: "FavoriteCount", nullable: true })
  favoriteCount: number | null;

  @Field()
  @Column("datetime", { name: "LastActivityDate" })
  lastActivityDate: Date;

  @Field({ nullable: true })
  @Column("datetime", { name: "LastEditDate", nullable: true })
  lastEditDate: string | null;

  @Field({ nullable: true })
  @Column("nvarchar", {
    name: "LastEditorDisplayName",
    nullable: true,
    length: 40,
  })
  lastEditorDisplayName: string | null;

  @Field({ nullable: true })
  @Column("int", { name: "LastEditorUserId", nullable: true })
  lastEditorUserId: number | null;

  @Field({ nullable: true })
  @Column("int", { name: "OwnerUserId", nullable: true })
  ownerUserId: number | null;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (u: User) => u.id, { nullable: true })
  @JoinColumn({ name: "OwnerUserId" })
  ownerUser?: User;

  @Field({ nullable: true })
  @Column("int", { name: "ParentId", nullable: true })
  parentId: number | null;

  @Field()
  @Column("int", { name: "PostTypeId" })
  postTypeId: number;

  @Field()
  @Column("int", { name: "Score" })
  score: number;

  @Field({ nullable: true })
  @Column("nvarchar", { name: "Tags", nullable: true, length: 150 })
  tags: string | null;

  @Field({ nullable: true })
  @Column("nvarchar", { name: "Title", nullable: true, length: 250 })
  title: string | null;

  @Field()
  @Column("int", { name: "ViewCount" })
  viewCount: number;

  @Field()
  votesCount: number;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (c: Comment) => c.post, { nullable: true })
  comments?: Comment[];
}
