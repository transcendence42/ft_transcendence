import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlayingInfoInput {
  @Field()
  uuid: string;
}
