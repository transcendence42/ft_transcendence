import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:5500/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5500/subscriptions',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          aliveChats: {
            // "Cache data may be lost when replacing the aliveChats field of a Query object." warning message 때문에 설정.
            // merge는 기존 캐시의 데이터와 새 데이터를 다루어 반환하는 값을 캐시에 저장. 들어가는 데이터를 가공할 수 있음.
            merge(existing = [], incoming) {
              return [...incoming];
            },
          },
          chat: {
            merge(existing, incoming) {
              const res = {};
              if (existing !== undefined) {
                Object.assign(res, existing);
              }
              if (incoming !== undefined) {
                Object.assign(res, incoming);
              }
              return res;
            },
          },
        },
      },
    },
  }),
});
