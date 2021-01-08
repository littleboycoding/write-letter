/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_PAPER_PLANES
// ====================================================

export interface GET_PAPER_PLANES_getPaperPlane {
  __typename: "Letter";
  id: string;
  content: string;
  writer: string;
  date: number;
  method: string;
  read: boolean | null;
}

export interface GET_PAPER_PLANES {
  getPaperPlane: GET_PAPER_PLANES_getPaperPlane;
}
