import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Users_Id", ["id"], { unique: true })
@ObjectType()
@Entity("Users", { schema: "dbo" })
export class Users {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Field({ nullable: true })
  @Column("nvarchar", { name: "AboutMe", nullable: true })
  aboutMe: string | null;

  @Field({ nullable: true })
  @Column("int", { name: "Age", nullable: true })
  age: number | null;

  @Field()
  @Column("datetime", { name: "CreationDate" })
  creationDate: Date;

  @Field()
  @Column("nvarchar", { name: "DisplayName", length: 40 })
  displayName: string;

  @Field()
  @Column("int", { name: "DownVotes" })
  downVotes: number;

  @Field({ nullable: true })
  @Column("nvarchar", { name: "EmailHash", nullable: true, length: 40 })
  emailHash: string | null;

  @Field()
  @Column("datetime", { name: "LastAccessDate" })
  lastAccessDate: Date;

  @Field({ nullable: true })
  @Column("nvarchar", { name: "Location", nullable: true, length: 100 })
  location: string | null;

  @Field()
  @Column("int", { name: "Reputation" })
  reputation: number;

  @Field()
  @Column("int", { name: "UpVotes" })
  upVotes: number;

  @Field()
  @Column("int", { name: "Views" })
  views: number;

  @Field({ nullable: true })
  @Column("nvarchar", { name: "WebsiteUrl", nullable: true, length: 200 })
  websiteUrl: string | null;

  @Field({ nullable: true })
  @Column("int", { name: "AccountId", nullable: true })
  accountId: number | null;
}