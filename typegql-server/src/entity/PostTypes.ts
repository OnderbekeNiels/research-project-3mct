import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_PostTypes_Id", ["id"], { unique: true })
@ObjectType()
@Entity("PostTypes", { schema: "dbo" })
export class PostType {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field()
  @Column("nvarchar", { name: "Type", length: 50 })
  type: string;
}
