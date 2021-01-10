import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Loader = styled(ReactLoading).attrs(() => ({
  type: "spin",
  height: 48,
}))``;

export default Loader;
