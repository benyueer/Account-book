import * as Types from '../generated/models';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecordListQueryVariables = Types.Exact<{
  limit: Types.Scalars['Float'];
  offset: Types.Scalars['Float'];
  userIds: Array<Types.Scalars['Float']> | Types.Scalars['Float'];
}>;


export type RecordListQuery = { __typename?: 'Query', recordList: Array<{ __typename?: 'Record', id: number, consumptionType: number, type: Types.Record_Type, date: any, remark?: string | null, imgs?: Array<string> | null }> };


export const RecordListDocument = gql`
    query recordList($limit: Float!, $offset: Float!, $userIds: [Float!]!) {
  recordList(limit: $limit, offset: $offset, userIds: $userIds) {
    id
    consumptionType
    type
    date
    remark
    imgs
  }
}
    `;

/**
 * __useRecordListQuery__
 *
 * To run a query within a React component, call `useRecordListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecordListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecordListQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useRecordListQuery(baseOptions: Apollo.QueryHookOptions<RecordListQuery, RecordListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecordListQuery, RecordListQueryVariables>(RecordListDocument, options);
      }
export function useRecordListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecordListQuery, RecordListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecordListQuery, RecordListQueryVariables>(RecordListDocument, options);
        }
export type RecordListQueryHookResult = ReturnType<typeof useRecordListQuery>;
export type RecordListLazyQueryHookResult = ReturnType<typeof useRecordListLazyQuery>;
export type RecordListQueryResult = Apollo.QueryResult<RecordListQuery, RecordListQueryVariables>;