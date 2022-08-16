import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { Toast } from "antd-mobile";

const httpLink = new HttpLink({ uri: 'http://192.168.3.146:8000/graphql' })

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : ''
    }
  }
})
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) {
    Toast.show({
      icon: 'fail',
      content: '网络错误',
    })
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink, httpLink])
})