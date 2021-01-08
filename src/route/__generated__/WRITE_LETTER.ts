/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WRITE_LETTER
// ====================================================

export interface WRITE_LETTER_writeLetter {
  __typename: "Letter";
  id: string;
  content: string;
  writer: string;
  date: number;
}

export interface WRITE_LETTER {
  writeLetter: WRITE_LETTER_writeLetter;
}

export interface WRITE_LETTERVariables {
  content: string;
  writer: string;
}
