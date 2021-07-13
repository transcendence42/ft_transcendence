import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://127.0.0.1:5500/graphql',
    credentials: 'true',
  }),
  cache: new InMemoryCache(),
});
