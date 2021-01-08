/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FETCH_MORE_COMMENTS
// ====================================================

export interface FETCH_MORE_COMMENTS_getLetter_getComments_comments {
  __typename: "Comment";
  id: string;
  letterId: string;
  content: string;
  commenter: string;
  date: number;
}

export interface FETCH_MORE_COMMENTS_getLetter_getComments {
  __typename: "Comments";
  cursor: string | null;
  limit: number;
  hasMore: boolean;
  letterId: string;
  comments: FETCH_MORE_COMMENTS_getLetter_getComments_comments[];
}

export interface FETCH_MORE_COMMENTS_getLetter {
  __typename: "Letter";
  id: string;
  getComments: FETCH_MORE_COMMENTS_getLetter_getComments;
}

export interface FETCH_MORE_COMMENTS {
  getLetter: FETCH_MORE_COMMENTS_getLetter;
}

export interface FETCH_MORE_COMMENTSVariables {
  cursor?: string | null;
  id: string;
}
