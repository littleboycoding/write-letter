/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_LETTERS
// ====================================================

export interface GET_LETTERS_getLetters_letters {
  __typename: "Letter";
  id: string;
  content: string;
  writer: string;
  date: number;
}

export interface GET_LETTERS_getLetters {
  __typename: "Letters";
  cursor: string | null;
  limit: number;
  hasMore: boolean;
  letters: GET_LETTERS_getLetters_letters[];
}

export interface GET_LETTERS {
  getLetters: GET_LETTERS_getLetters;
}

export interface GET_LETTERSVariables {
  cursor?: string | null;
  limit?: number | null;
}
