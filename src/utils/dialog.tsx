import React from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";

// const flyToDown = keyframes`
//   from {
//     transform: translateY(-75%);
//     opacity: 0;
//   }
//   to {
//     transform: translateY(0);
//     opacity: 1;
//   }
//   `;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
  `;

const DialogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  overflow: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${fadeIn} 0.3s;
`;

const DialogBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Dialog = styled.div`
  ${(props: { overflow: number }) =>
    props.overflow
      ? `
  position: absolute;
  top: 0;
  `
      : `position: relative;`}
  // background-color: white;
  padding: 15px;
  max-width: 85%;
  overflow: hidden;
  z-index: 1;

  div.inner {
    max-width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
  }

  div.inner > * {
    box-sizing: border-box;
  }
`;

function DialogStyled({
  children,
  overflow,
}: {
  children: JSX.Element | string | JSX.Element[];
  overflow: number;
}) {
  return (
    <Dialog overflow={overflow}>
      <div className="inner">{children}</div>
    </Dialog>
  );
}

function DialogContainerStyled({
  children,
  overflow = 0,
}: {
  children: JSX.Element | string | JSX.Element[];
  overflow?: number;
}) {
  const history = useHistory();

  return (
    <DialogContainer>
      <DialogBackground onClick={() => history.push("/")} />
      <DialogStyled overflow={overflow}>{children}</DialogStyled>
    </DialogContainer>
  );
}

export default DialogContainerStyled;
