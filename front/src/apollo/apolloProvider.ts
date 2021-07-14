import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GRAPHQL_URL } from '../utils/constants';

export const createClient = new ApolloClient({
  uri: GRAPHQL_URL,
  headers: {
    authorization: document.cookie ? `bearer ${document.cookie}` : '',
  },
  cache: new InMemoryCache().restore({}),
});
