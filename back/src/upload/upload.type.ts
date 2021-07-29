import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UserUploadAvatarType')
export class UserUploadAvatarType {
  @Field()
  success: boolean;
}
