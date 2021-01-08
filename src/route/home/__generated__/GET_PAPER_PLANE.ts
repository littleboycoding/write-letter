/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_PAPER_PLANE
// ====================================================

export interface GET_PAPER_PLANE_getPaperPlane {
  __typename: "Letter";
  id: string;
  content: string;
  writer: string;
  date: number;
  method: string;
  read: boolean | null;
}

export interface GET_PAPER_PLANE {
  getPaperPlane: GET_PAPER_PLANE_getPaperPlane;
}
