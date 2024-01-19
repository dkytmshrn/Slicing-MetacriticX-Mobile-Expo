import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://52.221.207.113/',
    cache: new InMemoryCache(),
  });

export default client