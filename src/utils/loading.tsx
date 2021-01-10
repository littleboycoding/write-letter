import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Loader = styled(ReactLoading).attrs((props) => ({
  type: "spin",
  height: 48,
  color: props.theme.color || "black",
}))`
  margin-bottom: 15px;
`;

export default Loader;
