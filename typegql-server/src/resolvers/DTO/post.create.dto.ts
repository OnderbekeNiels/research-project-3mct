import { Directive, Field, ID, InputType } from "type-graphql";

@InputType()
export class PostInput {
  @Field()
  body: string;

  @Field()
  creationDate: string;

  @Field()
  lastActivityDate: Date;

  @Field({ nullable: true })
  lastEditDate: string | null;

  @Field({ nullable: true })
  ownerUserId: number | null;

  @Field()
  postTypeId: number;

  @Field()
  score: number;

  @Field({ nullable: true })
  title: string | null;

  @Field()
  viewCount: number;

  @Field()
  votesCount: number;
}
