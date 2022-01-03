import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_VoteType_Id", ["id"], { unique: true })
@ObjectType()
@Entity("VoteTypes", { schema: "dbo" })
export class VoteType {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field()
  @Column("varchar", { name: "Name", length: 50 })
  name: string;
}
