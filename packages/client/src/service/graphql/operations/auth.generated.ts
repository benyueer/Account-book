import * as Types from '../generated/models';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LoginMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Token', access_token?: string | null, id?: number | null } };

export type QueryUserByNameQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type QueryUserByNameQuery = { __typename?: 'Query', queryUserByName: { __typename?: 'User', name?: string | null } };


export const LoginDocument = gql`
    mutation login($name: String!, $password: String!) {
  login(name: $name, password: $password) {
    access_token
    id
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const QueryUserByNameDocument = gql`
    query queryUserByName($name: String!) {
  queryUserByName(name: $name) {
    name
  }
}
    `;

/**
 * __useQueryUserByNameQuery__
 *
 * To run a query within a React component, call `useQueryUserByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryUserByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryUserByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useQueryUserByNameQuery(baseOptions: Apollo.QueryHookOptions<QueryUserByNameQuery, QueryUserByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryUserByNameQuery, QueryUserByNameQueryVariables>(QueryUserByNameDocument, options);
      }
export function useQueryUserByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryUserByNameQuery, QueryUserByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryUserByNameQuery, QueryUserByNameQueryVariables>(QueryUserByNameDocument, options);
        }
export type QueryUserByNameQueryHookResult = ReturnType<typeof useQueryUserByNameQuery>;
export type QueryUserByNameLazyQueryHookResult = ReturnType<typeof useQueryUserByNameLazyQuery>;
export type QueryUserByNameQueryResult = Apollo.QueryResult<QueryUserByNameQuery, QueryUserByNameQueryVariables>;