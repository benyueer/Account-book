import * as Types from '../generated/models';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type QueryAccountListByUserIdQueryVariables = Types.Exact<{
  userId: Types.Scalars['Float'];
}>;


export type QueryAccountListByUserIdQuery = { __typename?: 'Query', queryAccountListByUserId: Array<{ __typename?: 'Account', id: number, name: string, no: string, overage: number, costCount: number, incomeCount: number, icon?: string | null, type: Types.Account_Type }> };


export const QueryAccountListByUserIdDocument = gql`
    query queryAccountListByUserId($userId: Float!) {
  queryAccountListByUserId(userId: $userId) {
    id
    name
    no
    overage
    costCount
    incomeCount
    icon
    type
  }
}
    `;

/**
 * __useQueryAccountListByUserIdQuery__
 *
 * To run a query within a React component, call `useQueryAccountListByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryAccountListByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryAccountListByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useQueryAccountListByUserIdQuery(baseOptions: Apollo.QueryHookOptions<QueryAccountListByUserIdQuery, QueryAccountListByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryAccountListByUserIdQuery, QueryAccountListByUserIdQueryVariables>(QueryAccountListByUserIdDocument, options);
      }
export function useQueryAccountListByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryAccountListByUserIdQuery, QueryAccountListByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryAccountListByUserIdQuery, QueryAccountListByUserIdQueryVariables>(QueryAccountListByUserIdDocument, options);
        }
export type QueryAccountListByUserIdQueryHookResult = ReturnType<typeof useQueryAccountListByUserIdQuery>;
export type QueryAccountListByUserIdLazyQueryHookResult = ReturnType<typeof useQueryAccountListByUserIdLazyQuery>;
export type QueryAccountListByUserIdQueryResult = Apollo.QueryResult<QueryAccountListByUserIdQuery, QueryAccountListByUserIdQueryVariables>;