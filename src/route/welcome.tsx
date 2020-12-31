import React, { ChangeEvent, FormEvent, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const WelcomeKeyframes = keyframes`
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(0);
  }
`;

const FadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
  `;

const WelcomeStyled = styled.div`
  display: flex;
  height: 100vh;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: calc(1vw + 1vh + 4px);

  .welcome_title {
    font-size: 1.5em;
    font-weight: bold;
    animation: ${WelcomeKeyframes} 1s;
    margin: 15px;
  }
`;

const Hint = styled.span``;

const Form = styled.form`
  animation: ${FadeInKeyframes} 2s;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 6px;
  }
`;

const SubmitButton = styled.input.attrs(() => ({
  type: "submit",
}))`
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    background-color: #666;
    transition: all 0.3s;
    cursor: pointer;
  }
`;

const NameTextbox = styled.input.attrs(() => ({
  type: "text",
  placeholder: "Anonymous",
}))`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

function Welcome() {
  const [name, nameSetter] = useState<string>("");
  const history = useHistory();

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    nameSetter(event.target.value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    window.localStorage.setItem("username", name || "Anonymous");
    history.push("/");

    event.preventDefault();
  }

  if (window.localStorage.getItem("username")) return <Redirect to="/" />;

  return (
    <WelcomeStyled>
      <span className="welcome_title">Welcome to Write Letter</span>
      <Form onSubmit={onSubmit}>
        <Hint>Tell us your name (you don't have to)</Hint>
        <NameTextbox value={name} onChange={onNameChange} />
        <SubmitButton value={name === "" ? "Continue as anonymous" : "Enter"} />
      </Form>
    </WelcomeStyled>
  );
}

export default Welcome;
