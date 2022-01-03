import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Posts_Id", ["id"], { unique: true })
@ObjectType()
@Entity("Posts", { schema: "dbo" })
export class Posts {
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
  closedDate: Date | null;

  @Field({ nullable: true })
  @Column("int", { name: "CommentCount", nullable: true })
  commentCount: number | null;

  @Field({ nullable: true })
  @Column("datetime", { name: "CommunityOwnedDate", nullable: true })
  communityOwnedDate: Date | null;

  @Column("datetime", { name: "CreationDate" })
  creationDate: Date;

  @Field({ nullable: true })
  @Column("int", { name: "FavoriteCount", nullable: true })
  favoriteCount: number | null;

  @Field()
  @Column("datetime", { name: "LastActivityDate" })
  lastActivityDate: Date;

  @Field({ nullable: true })
  @Column("datetime", { name: "LastEditDate", nullable: true })
  lastEditDate: Date | null;

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
}
