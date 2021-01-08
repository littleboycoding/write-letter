/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WRITE_COMMENT
// ====================================================

export interface WRITE_COMMENT_writeComment {
  __typename: "Comment";
  id: string;
  letterId: string;
  content: string;
  commenter: string;
  date: number;
}

export interface WRITE_COMMENT {
  writeComment: WRITE_COMMENT_writeComment;
}

export interface WRITE_COMMENTVariables {
  letterId: string;
  content: string;
  commenter: string;
}
