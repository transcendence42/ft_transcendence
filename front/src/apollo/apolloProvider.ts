import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GRAPHQL_URL } from '../utils/constants';
import { getCookies, bearerAuthorization } from '../utils/util';

export const createClient = new ApolloClient({
  uri: GRAPHQL_URL,
  headers: {
    authorization: bearerAuthorization(getCookies('access_token')),
  },
  cache: new InMemoryCache().restore({}),
});
