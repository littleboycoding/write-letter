/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_LETTERS2
// ====================================================

export interface GET_LETTERS2_getLetters2_letters {
  __typename: "Letter";
  id: string;
  content: string;
  writer: string;
  date: number;
}

export interface GET_LETTERS2_getLetters2 {
  __typename: "Letters2";
  cursor: string;
  limit: number;
  hasMore: boolean;
  letters: GET_LETTERS2_getLetters2_letters[];
}

export interface GET_LETTERS2 {
  getLetters2: GET_LETTERS2_getLetters2;
}

export interface GET_LETTERS2Variables {
  cursor?: string | null;
  limit?: number | null;
}
