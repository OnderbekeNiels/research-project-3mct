import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Id {
  @Field(() => ID)
  id: number;
}
