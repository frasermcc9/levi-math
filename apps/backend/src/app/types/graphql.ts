
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface ScoreInput {
    name: string;
    score: number;
}

export interface DailyScoreEntity {
    date: DateTime;
    id: string;
    ms?: Nullable<number>;
    user: UserEntity;
    userFirebaseId: string;
}

export interface IMutation {
    createScore(score: ScoreInput): ScoreEntity | Promise<ScoreEntity>;
    deleteScore(number: number): boolean | Promise<boolean>;
    startDaily(): Nullable<string> | Promise<Nullable<string>>;
    submitDaily(key: string, milliseconds: number): boolean | Promise<boolean>;
}

export interface IQuery {
    allScores(): ScoreEntity[] | Promise<ScoreEntity[]>;
    allScoresPastDay(): ScoreEntity[] | Promise<ScoreEntity[]>;
    allScoresPastWeek(): ScoreEntity[] | Promise<ScoreEntity[]>;
    allScoresUniqueUser(): ScoreEntity[] | Promise<ScoreEntity[]>;
    getDailyQuestions(): QuestionEntity[] | Promise<QuestionEntity[]>;
    getDailyScores(): DailyScoreEntity[] | Promise<DailyScoreEntity[]>;
}

export interface QuestionEntity {
    lhs: number;
    operator: string;
    rhs: number;
}

export interface ScoreEntity {
    date: DateTime;
    id: string;
    name: string;
    score: number;
}

export interface UserEntity {
    dailyScore?: Nullable<DailyScoreEntity>;
    firebaseId: string;
    username: string;
}

export type DateTime = any;
type Nullable<T> = T | null;
