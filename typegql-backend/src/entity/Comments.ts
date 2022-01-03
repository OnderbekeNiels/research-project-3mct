import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Comments_Id", ["id"], { unique: true })
@ObjectType()
@Entity("Comments", { schema: "dbo" })
export class Comments {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field()
  @Column("datetime", { name: "CreationDate" })
  creationDate: Date;

  @Field()
  @Column("int", { name: "PostId" })
  postId: number;

  @Field({ nullable: true })
  @Column("int", { name: "Score", nullable: true })
  score: number | null;

  @Field()
  @Column("nvarchar", { name: "Text", length: 700 })
  text: string;

  @Field({ nullable: true })
  @Column("int", { name: "UserId", nullable: true })
  userId: number | null;
}
