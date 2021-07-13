import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { GRAPHQL_URL } from '../utils/constants';

export const createClient = () => {
  const httpLink = createHttpLink({
    uri: `${GRAPHQL_URL}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Cookie: document.cookie ? document.cookie : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore({}),
  });
};
