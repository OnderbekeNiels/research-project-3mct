import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Votes_Id", ["id"], { unique: true })
@ObjectType()
@Entity("Votes", { schema: "dbo" })
export class Vote {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field()
  @Column("int", { name: "PostId" })
  postId: number;

  @Field({ nullable: true })
  @Column("int", { name: "UserId", nullable: true })
  userId: number | null;

  @Field({ nullable: true })
  @Column("int", { name: "BountyAmount", nullable: true })
  bountyAmount: number | null;

  @Field()
  @Column("int", { name: "VoteTypeId" })
  voteTypeId: number;

  @Field()
  @Column("datetime", { name: "CreationDate" })
  creationDate: Date;
}
