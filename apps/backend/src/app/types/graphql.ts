
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

export interface IMutation {
    createScore(score: ScoreInput): ScoreEntity | Promise<ScoreEntity>;
}

export interface IQuery {
    allScores(): ScoreEntity[] | Promise<ScoreEntity[]>;
}

export interface ScoreEntity {
    date: DateTime;
    id: string;
    name: string;
    score: number;
}

export type DateTime = any;
type Nullable<T> = T | null;
