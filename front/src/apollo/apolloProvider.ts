import { ApolloClient, InMemoryCache, HttpLink, split, makeVar } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { GRAPHQL_URL } from '../utils/constants';
import { getCookies, bearerAuthorization } from '../utils/util';

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

export const currentChatVar = makeVar('');

export const createClient = new ApolloClient({
  link: splitLink,
  uri: GRAPHQL_URL,
  headers: {
    authorization: bearerAuthorization(getCookies('access_token')),
  },
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          aliveChats: {
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
