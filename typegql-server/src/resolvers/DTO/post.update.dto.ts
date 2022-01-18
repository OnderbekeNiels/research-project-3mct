import { Field, ID, InputType, ObjectType } from "type-graphql";

@InputType()
export class PostUpdate {
  @Field()
  body: string;

  @Field({ nullable: true })
  title: string | null;
}