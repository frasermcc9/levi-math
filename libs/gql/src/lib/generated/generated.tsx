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

export type DailyScoreEntity = {
  __typename?: 'DailyScoreEntity';
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  ms?: Maybe<Scalars['Float']>;
  user: UserEntity;
  userFirebaseId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createScore: ScoreEntity;
  deleteScore: Scalars['Boolean'];
  startDaily?: Maybe<Scalars['String']>;
  submitDaily: Scalars['Boolean'];
};


export type MutationCreateScoreArgs = {
  score: ScoreInput;
};


export type MutationDeleteScoreArgs = {
  number: Scalars['Float'];
};


export type MutationSubmitDailyArgs = {
  key: Scalars['String'];
  milliseconds: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  allScores: Array<ScoreEntity>;
  allScoresPastDay: Array<ScoreEntity>;
  allScoresPastWeek: Array<ScoreEntity>;
  allScoresUniqueUser: Array<ScoreEntity>;
  getDailyQuestions: Array<QuestionEntity>;
  getDailyScores: Array<DailyScoreEntity>;
};

export type QuestionEntity = {
  __typename?: 'QuestionEntity';
  lhs: Scalars['Float'];
  operator: Scalars['String'];
  rhs: Scalars['Float'];
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

export type UserEntity = {
  __typename?: 'UserEntity';
  dailyScore?: Maybe<DailyScoreEntity>;
  firebaseId: Scalars['ID'];
  username: Scalars['String'];
};

export type GetRegularScoresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRegularScoresQuery = { __typename?: 'Query', allScores: Array<{ __typename?: 'ScoreEntity', id: string, date: import("luxon").DateTime, name: string, score: number }>, allScoresUniqueUser: Array<{ __typename?: 'ScoreEntity', id: string, date: import("luxon").DateTime, name: string, score: number }>, allScoresPastWeek: Array<{ __typename?: 'ScoreEntity', id: string, date: import("luxon").DateTime, name: string, score: number }>, allScoresPastDay: Array<{ __typename?: 'ScoreEntity', id: string, date: import("luxon").DateTime, name: string, score: number }> };

export type PostScoreMutationVariables = Exact<{
  score: Scalars['Int'];
  name: Scalars['String'];
}>;


export type PostScoreMutation = { __typename?: 'Mutation', createScore: { __typename?: 'ScoreEntity', date: import("luxon").DateTime, id: string, name: string, score: number } };

export type GetDailyQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDailyQuestionsQuery = { __typename?: 'Query', getDailyQuestions: Array<{ __typename?: 'QuestionEntity', lhs: number, operator: string, rhs: number }> };

export type StartDailyMutationVariables = Exact<{ [key: string]: never; }>;


export type StartDailyMutation = { __typename?: 'Mutation', startDaily?: string | null };

export type EndDailyMutationVariables = Exact<{
  key: Scalars['String'];
  duration: Scalars['Int'];
}>;


export type EndDailyMutation = { __typename?: 'Mutation', submitDaily: boolean };

export type DailyChallengeResultsQueryVariables = Exact<{ [key: string]: never; }>;


export type DailyChallengeResultsQuery = { __typename?: 'Query', getDailyScores: Array<{ __typename?: 'DailyScoreEntity', ms?: number | null, date: import("luxon").DateTime, user: { __typename?: 'UserEntity', username: string } }> };


export const GetRegularScoresDocument = gql`
    query GetRegularScores {
  allScores {
    id
    date
    name
    score
  }
  allScoresUniqueUser {
    id
    date
    name
    score
  }
  allScoresPastWeek {
    id
    date
    name
    score
  }
  allScoresPastDay {
    id
    date
    name
    score
  }
}
    `;

/**
 * __useGetRegularScoresQuery__
 *
 * To run a query within a React component, call `useGetRegularScoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRegularScoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRegularScoresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRegularScoresQuery(baseOptions?: Apollo.QueryHookOptions<GetRegularScoresQuery, GetRegularScoresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRegularScoresQuery, GetRegularScoresQueryVariables>(GetRegularScoresDocument, options);
      }
export function useGetRegularScoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRegularScoresQuery, GetRegularScoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRegularScoresQuery, GetRegularScoresQueryVariables>(GetRegularScoresDocument, options);
        }
export type GetRegularScoresQueryHookResult = ReturnType<typeof useGetRegularScoresQuery>;
export type GetRegularScoresLazyQueryHookResult = ReturnType<typeof useGetRegularScoresLazyQuery>;
export type GetRegularScoresQueryResult = Apollo.QueryResult<GetRegularScoresQuery, GetRegularScoresQueryVariables>;
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
export const GetDailyQuestionsDocument = gql`
    query GetDailyQuestions {
  getDailyQuestions {
    lhs
    operator
    rhs
  }
}
    `;

/**
 * __useGetDailyQuestionsQuery__
 *
 * To run a query within a React component, call `useGetDailyQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDailyQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDailyQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDailyQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<GetDailyQuestionsQuery, GetDailyQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDailyQuestionsQuery, GetDailyQuestionsQueryVariables>(GetDailyQuestionsDocument, options);
      }
export function useGetDailyQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDailyQuestionsQuery, GetDailyQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDailyQuestionsQuery, GetDailyQuestionsQueryVariables>(GetDailyQuestionsDocument, options);
        }
export type GetDailyQuestionsQueryHookResult = ReturnType<typeof useGetDailyQuestionsQuery>;
export type GetDailyQuestionsLazyQueryHookResult = ReturnType<typeof useGetDailyQuestionsLazyQuery>;
export type GetDailyQuestionsQueryResult = Apollo.QueryResult<GetDailyQuestionsQuery, GetDailyQuestionsQueryVariables>;
export const StartDailyDocument = gql`
    mutation StartDaily {
  startDaily
}
    `;
export type StartDailyMutationFn = Apollo.MutationFunction<StartDailyMutation, StartDailyMutationVariables>;

/**
 * __useStartDailyMutation__
 *
 * To run a mutation, you first call `useStartDailyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartDailyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startDailyMutation, { data, loading, error }] = useStartDailyMutation({
 *   variables: {
 *   },
 * });
 */
export function useStartDailyMutation(baseOptions?: Apollo.MutationHookOptions<StartDailyMutation, StartDailyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartDailyMutation, StartDailyMutationVariables>(StartDailyDocument, options);
      }
export type StartDailyMutationHookResult = ReturnType<typeof useStartDailyMutation>;
export type StartDailyMutationResult = Apollo.MutationResult<StartDailyMutation>;
export type StartDailyMutationOptions = Apollo.BaseMutationOptions<StartDailyMutation, StartDailyMutationVariables>;
export const EndDailyDocument = gql`
    mutation EndDaily($key: String!, $duration: Int!) {
  submitDaily(key: $key, milliseconds: $duration)
}
    `;
export type EndDailyMutationFn = Apollo.MutationFunction<EndDailyMutation, EndDailyMutationVariables>;

/**
 * __useEndDailyMutation__
 *
 * To run a mutation, you first call `useEndDailyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndDailyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endDailyMutation, { data, loading, error }] = useEndDailyMutation({
 *   variables: {
 *      key: // value for 'key'
 *      duration: // value for 'duration'
 *   },
 * });
 */
export function useEndDailyMutation(baseOptions?: Apollo.MutationHookOptions<EndDailyMutation, EndDailyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndDailyMutation, EndDailyMutationVariables>(EndDailyDocument, options);
      }
export type EndDailyMutationHookResult = ReturnType<typeof useEndDailyMutation>;
export type EndDailyMutationResult = Apollo.MutationResult<EndDailyMutation>;
export type EndDailyMutationOptions = Apollo.BaseMutationOptions<EndDailyMutation, EndDailyMutationVariables>;
export const DailyChallengeResultsDocument = gql`
    query DailyChallengeResults {
  getDailyScores {
    user {
      username
    }
    ms
    date
  }
}
    `;

/**
 * __useDailyChallengeResultsQuery__
 *
 * To run a query within a React component, call `useDailyChallengeResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDailyChallengeResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDailyChallengeResultsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDailyChallengeResultsQuery(baseOptions?: Apollo.QueryHookOptions<DailyChallengeResultsQuery, DailyChallengeResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DailyChallengeResultsQuery, DailyChallengeResultsQueryVariables>(DailyChallengeResultsDocument, options);
      }
export function useDailyChallengeResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DailyChallengeResultsQuery, DailyChallengeResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DailyChallengeResultsQuery, DailyChallengeResultsQueryVariables>(DailyChallengeResultsDocument, options);
        }
export type DailyChallengeResultsQueryHookResult = ReturnType<typeof useDailyChallengeResultsQuery>;
export type DailyChallengeResultsLazyQueryHookResult = ReturnType<typeof useDailyChallengeResultsLazyQuery>;
export type DailyChallengeResultsQueryResult = Apollo.QueryResult<DailyChallengeResultsQuery, DailyChallengeResultsQueryVariables>;