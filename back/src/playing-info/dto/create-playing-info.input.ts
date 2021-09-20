import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlayingInfoInput {
  @Field()
  uuid: string;
}
