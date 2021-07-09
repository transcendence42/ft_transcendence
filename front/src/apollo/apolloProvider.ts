import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:5500/graphql',
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});
