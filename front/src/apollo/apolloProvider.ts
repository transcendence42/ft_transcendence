import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { GRAPHQL_URL } from '../utils/constants';

export const createClient = () => {
  const httpLink = createHttpLink({
    uri: `${GRAPHQL_URL}`,
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: document.cookie ? `bearer ${document.cookie}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore({}),
  });
};
