import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateFollowInput {
  @IsNotEmpty()
  @Field(() => String)
  followingID: string;

  @IsNotEmpty()
  @Field(() => String)
  followerID: string;
}
