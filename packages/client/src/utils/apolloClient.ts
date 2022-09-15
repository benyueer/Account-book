import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { Toast } from "antd-mobile";
import { config } from "../config";
import { getToken } from "./utils";

const httpLink = new HttpLink({ uri: config.SERVER_URI })

const authLink = setContext((_, {headers}) => {
  const token = getToken();
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