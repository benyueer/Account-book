import * as Types from '../generated/models';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetConsumptionTypeQueryVariables = Types.Exact<{
  familyId?: Types.InputMaybe<Types.Scalars['Float']>;
}>;


export type GetConsumptionTypeQuery = { __typename?: 'Query', getConsumptionType: Array<{ __typename?: 'ConsumptionTypeItem', id: number, pid: number, baseType: Types.Base_Type, name: string, children?: Array<{ __typename?: 'ConsumptionTypeItem', id: number, pid: number, baseType: Types.Base_Type, name: string }> | null }> };


export const GetConsumptionTypeDocument = gql`
    query getConsumptionType($familyId: Float) {
  getConsumptionType(familyId: $familyId) {
    id
    pid
    baseType
    name
    children {
      id
      pid
      baseType
      name
    }
  }
}
    `;

/**
 * __useGetConsumptionTypeQuery__
 *
 * To run a query within a React component, call `useGetConsumptionTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConsumptionTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConsumptionTypeQuery({
 *   variables: {
 *      familyId: // value for 'familyId'
 *   },
 * });
 */
export function useGetConsumptionTypeQuery(baseOptions?: Apollo.QueryHookOptions<GetConsumptionTypeQuery, GetConsumptionTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConsumptionTypeQuery, GetConsumptionTypeQueryVariables>(GetConsumptionTypeDocument, options);
      }
export function useGetConsumptionTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConsumptionTypeQuery, GetConsumptionTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConsumptionTypeQuery, GetConsumptionTypeQueryVariables>(GetConsumptionTypeDocument, options);
        }
export type GetConsumptionTypeQueryHookResult = ReturnType<typeof useGetConsumptionTypeQuery>;
export type GetConsumptionTypeLazyQueryHookResult = ReturnType<typeof useGetConsumptionTypeLazyQuery>;
export type GetConsumptionTypeQueryResult = Apollo.QueryResult<GetConsumptionTypeQuery, GetConsumptionTypeQueryVariables>;