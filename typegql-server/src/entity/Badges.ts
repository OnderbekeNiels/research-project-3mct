import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";

@Index("PK_Badges_Id", ["id"], { unique: true })
@ObjectType()
@Entity("Badges", { schema: "dbo" })
export class Badge {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field()
  @Column("nvarchar", { name: "Name", length: 40 })
  name: string;

  @Field(() => ID)
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (u: User) => u.id)
  @JoinColumn({ name: "UserId" })
  user: User;

  @Field()
  @Column("datetime", { name: "Date" })
  date: Date;
}
