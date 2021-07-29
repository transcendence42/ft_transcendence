import { Scalar } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@Scalar('Upload')
export class Upload {
  parseValue(value) {
    return GraphQLUpload.parseValue(value);
  }

  serialize(value: any) {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast) {
    return GraphQLUpload.parseLiteral(ast, ast.value);
  }
}
