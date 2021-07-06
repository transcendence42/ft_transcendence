import { PubSub } from 'graphql-subscriptions';

export class PubSubProvider {
  static pubSub: PubSub;
  getPubSub() {
    if (!PubSubProvider.pubSub) {
      PubSubProvider.pubSub = new PubSub();
    }
    return PubSubProvider.pubSub;
  }
}
