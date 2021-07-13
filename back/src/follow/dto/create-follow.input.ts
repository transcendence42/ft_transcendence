import { InputType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateFollowInput {
  @IsNotEmpty()
  following: User;

  @IsNotEmpty()
  follower: User;
}
