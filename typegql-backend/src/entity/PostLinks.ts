import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_PostLinks_Id", ["id"], { unique: true })
@ObjectType()
@Entity("PostLinks", { schema: "dbo" })
export class PostLinks {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field()
  @Column("datetime", { name: "CreationDate" })
  creationDate: Date;

  @Field()
  @Column("int", { name: "PostId" })
  postId: number;

  @Field()
  @Column("int", { name: "RelatedPostId" })
  relatedPostId: number;

  @Field()
  @Column("int", { name: "LinkTypeId" })
  linkTypeId: number;
}
