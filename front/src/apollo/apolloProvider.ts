import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:5500/',
  credentials: 'same-origin',
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
