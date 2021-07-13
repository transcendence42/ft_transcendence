import { Field, InputType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateFollowInput {
  @IsNotEmpty()
  @Field(() => User)
  following: User;

  @IsNotEmpty()
  @Field(() => User)
  follower: User;
}
