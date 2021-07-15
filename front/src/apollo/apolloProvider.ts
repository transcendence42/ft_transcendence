import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GRAPHQL_URL } from '../utils/constants';
import { getCookies, bearerAuthorization } from '../utils/util';

export const createClient = new ApolloClient({
  uri: GRAPHQL_URL,
  headers: {
    authorization: bearerAuthorization(getCookies('access_token')),
  },
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
        },
      },
    },
  }),
});
