import { Global, Module } from '@nestjs/common';
import { PubSubProvider } from './pub-sub.provider';

@Global()
@Module({
  providers: [PubSubProvider],
  exports: [PubSubProvider],
})
export class PubSubModule {}
