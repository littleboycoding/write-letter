/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_LETTER
// ====================================================

export interface GET_LETTER_getLetter_getComments_comments {
  __typename: "Comment";
  id: string;
  content: string;
  commenter: string;
  date: number;
}

export interface GET_LETTER_getLetter_getComments {
  __typename: "Comments";
  offset: number;
  limit: number;
  letterId: string;
  hasMore: boolean;
  comments: GET_LETTER_getLetter_getComments_comments[];
}

export interface GET_LETTER_getLetter {
  __typename: "Letter";
  id: string;
  content: string;
  writer: string;
  date: number;
  getComments: GET_LETTER_getLetter_getComments;
}

export interface GET_LETTER {
  getLetter: GET_LETTER_getLetter;
}

export interface GET_LETTERVariables {
  id: string;
}
