import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateFollowInput {
  @IsNotEmpty()
  @Field(() => User)
  following: User;

  @IsNotEmpty()
  @Field(() => User)
  follower: User;
}
