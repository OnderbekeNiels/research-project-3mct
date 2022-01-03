import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Badges_Id", ["id"], { unique: true })
@ObjectType()
@Entity("Badges", { schema: "dbo" })
export class Badges {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field()
  @Column("nvarchar", { name: "Name", length: 40 })
  name: string;

  @Field()
  @Column("int", { name: "UserId" })
  userId: number;

  @Field()
  @Column("datetime", { name: "Date" })
  date: Date;
}
