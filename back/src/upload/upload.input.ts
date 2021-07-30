import { Upload } from './upload.scalar';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UploadUserAvatarInput {
  // @Field()
  // file: Upload;
}
