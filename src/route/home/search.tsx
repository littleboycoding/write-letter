import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import * as GET_PAPER_PLANE_TYPES from "./__generated__/GET_PAPER_PLANE";

import { InfoContainerStyled } from "./letterinfo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import { Redirect } from "react-router-dom";

import Loader from "../../utils/loading";

const GET_PAPER_PLANE = gql`
  query GET_PAPER_PLANE {
    getPaperPlane {
      id
      content
      writer
      date
      method
      read
    }
  }
`;

const NoPaperPlane = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 100px;
  justify-items: center;
  align-items: center;
  font-size: calc(1vw + 1vh + 10px);
  padding: 10px;

  svg {
    margin: 0 15px 0 0;
    color: #666;
  }

  span.research {
    grid-column: 1 / 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.7em;
    margin-top: 15px;
    padding: 20px;
  }

  span.research svg {
    margin: 10px;
  }
`;

function Search() {
  const {
    data,
    loading,
    error,
    stopPolling,
    startPolling,
  } = useQuery<GET_PAPER_PLANE_TYPES.GET_PAPER_PLANE>(GET_PAPER_PLANE, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error?.message === "no paper plane found") {
      startPolling(1000);
      return stopPolling;
    }
  }, [error, startPolling, stopPolling]);

  if (error?.message === "no paper plane found") {
    return (
      <NoPaperPlane>
        <FontAwesomeIcon icon={faPaperPlane} />
        <span>Catching paper plane from stranger</span>
        <span className="research">
          Looking for it <Loader />
        </span>
      </NoPaperPlane>
    );
  } else if (error) {
    return <Redirect to="/" />;
  }

  if (data && !loading) {
    return <InfoContainerStyled data={data.getPaperPlane} />;
  }

  return <span>Loading</span>;
}

export default Search;
