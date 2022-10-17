import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date scalar type, represented as an ISO timestamp over the network. Is parsed to a luxon DateTime object. */
  DateTime: import("luxon").DateTime;
};

export type Mutation = {
  __typename?: 'Mutation';
  createScore: ScoreEntity;
  deleteScore: Scalars['Boolean'];
};


export type MutationCreateScoreArgs = {
  score: ScoreInput;
};


export type MutationDeleteScoreArgs = {
  number: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  allScores: Array<ScoreEntity>;
  allScoresPastWeek: Array<ScoreEntity>;
  allScoresUniqueUser: Array<ScoreEntity>;
};

export type ScoreEntity = {
  __typename?: 'ScoreEntity';
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  score: Scalars['Float'];
};

export type ScoreInput = {
  name: Scalars['String'];
  score: Scalars['Int'];
};

export type GetScoresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetScoresQuery = { __typename?: 'Query', allScores: Array<{ __typename?: 'ScoreEntity', id: string, date: import("luxon").DateTime, name: string, score: number }> };

export type GetUniqueScoresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUniqueScoresQuery = { __typename?: 'Query', allScoresUniqueUser: Array<{ __typename?: 'ScoreEntity', id: string, date: import("luxon").DateTime, name: string, score: number }> };

export type GetScoresPastWeekQueryVariables = Exact<{ [key: string]: never; }>;


export type GetScoresPastWeekQuery = { __typename?: 'Query', allScoresPastWeek: Array<{ __typename?: 'ScoreEntity', id: string, date: import("luxon").DateTime, name: string, score: number }> };

export type PostScoreMutationVariables = Exact<{
  score: Scalars['Int'];
  name: Scalars['String'];
}>;


export type PostScoreMutation = { __typename?: 'Mutation', createScore: { __typename?: 'ScoreEntity', date: import("luxon").DateTime, id: string, name: string, score: number } };


export const GetScoresDocument = gql`
    query GetScores {
  allScores {
    id
    date
    name
    score
  }
}
    `;

/**
 * __useGetScoresQuery__
 *
 * To run a query within a React component, call `useGetScoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScoresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetScoresQuery(baseOptions?: Apollo.QueryHookOptions<GetScoresQuery, GetScoresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScoresQuery, GetScoresQueryVariables>(GetScoresDocument, options);
      }
export function useGetScoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScoresQuery, GetScoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScoresQuery, GetScoresQueryVariables>(GetScoresDocument, options);
        }
export type GetScoresQueryHookResult = ReturnType<typeof useGetScoresQuery>;
export type GetScoresLazyQueryHookResult = ReturnType<typeof useGetScoresLazyQuery>;
export type GetScoresQueryResult = Apollo.QueryResult<GetScoresQuery, GetScoresQueryVariables>;
export const GetUniqueScoresDocument = gql`
    query GetUniqueScores {
  allScoresUniqueUser {
    id
    date
    name
    score
  }
}
    `;

/**
 * __useGetUniqueScoresQuery__
 *
 * To run a query within a React component, call `useGetUniqueScoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUniqueScoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUniqueScoresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUniqueScoresQuery(baseOptions?: Apollo.QueryHookOptions<GetUniqueScoresQuery, GetUniqueScoresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUniqueScoresQuery, GetUniqueScoresQueryVariables>(GetUniqueScoresDocument, options);
      }
export function useGetUniqueScoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUniqueScoresQuery, GetUniqueScoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUniqueScoresQuery, GetUniqueScoresQueryVariables>(GetUniqueScoresDocument, options);
        }
export type GetUniqueScoresQueryHookResult = ReturnType<typeof useGetUniqueScoresQuery>;
export type GetUniqueScoresLazyQueryHookResult = ReturnType<typeof useGetUniqueScoresLazyQuery>;
export type GetUniqueScoresQueryResult = Apollo.QueryResult<GetUniqueScoresQuery, GetUniqueScoresQueryVariables>;
export const GetScoresPastWeekDocument = gql`
    query GetScoresPastWeek {
  allScoresPastWeek {
    id
    date
    name
    score
  }
}
    `;

/**
 * __useGetScoresPastWeekQuery__
 *
 * To run a query within a React component, call `useGetScoresPastWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScoresPastWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScoresPastWeekQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetScoresPastWeekQuery(baseOptions?: Apollo.QueryHookOptions<GetScoresPastWeekQuery, GetScoresPastWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScoresPastWeekQuery, GetScoresPastWeekQueryVariables>(GetScoresPastWeekDocument, options);
      }
export function useGetScoresPastWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScoresPastWeekQuery, GetScoresPastWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScoresPastWeekQuery, GetScoresPastWeekQueryVariables>(GetScoresPastWeekDocument, options);
        }
export type GetScoresPastWeekQueryHookResult = ReturnType<typeof useGetScoresPastWeekQuery>;
export type GetScoresPastWeekLazyQueryHookResult = ReturnType<typeof useGetScoresPastWeekLazyQuery>;
export type GetScoresPastWeekQueryResult = Apollo.QueryResult<GetScoresPastWeekQuery, GetScoresPastWeekQueryVariables>;
export const PostScoreDocument = gql`
    mutation PostScore($score: Int!, $name: String!) {
  createScore(score: {name: $name, score: $score}) {
    date
    id
    name
    score
  }
}
    `;
export type PostScoreMutationFn = Apollo.MutationFunction<PostScoreMutation, PostScoreMutationVariables>;

/**
 * __usePostScoreMutation__
 *
 * To run a mutation, you first call `usePostScoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostScoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postScoreMutation, { data, loading, error }] = usePostScoreMutation({
 *   variables: {
 *      score: // value for 'score'
 *      name: // value for 'name'
 *   },
 * });
 */
export function usePostScoreMutation(baseOptions?: Apollo.MutationHookOptions<PostScoreMutation, PostScoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostScoreMutation, PostScoreMutationVariables>(PostScoreDocument, options);
      }
export type PostScoreMutationHookResult = ReturnType<typeof usePostScoreMutation>;
export type PostScoreMutationResult = Apollo.MutationResult<PostScoreMutation>;
export type PostScoreMutationOptions = Apollo.BaseMutationOptions<PostScoreMutation, PostScoreMutationVariables>;