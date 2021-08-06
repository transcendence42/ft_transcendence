import { Field, ObjectType } from '@nestjs/graphql';
import { Stream } from 'stream';

@ObjectType('UploadReturnType')
export class UploadReturnType {
  @Field()
  success: boolean;
}

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
