import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_LinkTypes_Id", ["id"], { unique: true })
@ObjectType()
@Entity("LinkTypes", { schema: "dbo" })
export class LinkType {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field()
  @Column("varchar", { name: "Type", length: 50 })
  type: string;
}
