import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { GRAPHQL_URL } from '../utils/constants';

export const client = new ApolloClient({
  link: createHttpLink({
    uri: GRAPHQL_URL,
    credentials: 'true',
  }),
  cache: new InMemoryCache(),
});
