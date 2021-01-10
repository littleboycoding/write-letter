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
  padding: 0px 15px;

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

const Hint = styled.span`
  font-size: 0.8em;
`;

const Form = styled.form`
  animation: ${FadeInKeyframes} 2s;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin: 6px;
  }
`;

const StartButton = styled.input.attrs(() => ({
  type: "button",
}))`
  margin-top: 25px;
  padding: 10px 15px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  transition: all 0.3s;
  font-size: 0.6em;

  &:hover {
    background-color: #666;
    transition: all 0.3s;
    cursor: pointer;
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

interface PageProps {
  pageSetter: (c: number) => any;
}

const NameTextbox = styled.input.attrs(() => ({
  type: "text",
  placeholder: "Anonymous",
}))`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

function Welcome() {
  const [page, pageSetter] = useState<number>(0);

  if (window.localStorage.getItem("username")) return <Redirect to="/" />;

  const pageArray = [
    <FirstSlide pageSetter={(c) => pageSetter(page + c)} />,
    <SecondSlide pageSetter={(c) => pageSetter(page + c)} />,
  ];

  return <WelcomeStyled>{pageArray[page]}</WelcomeStyled>;
}
function SecondSlide(props: PageProps) {
  const history = useHistory();
  const [name, nameSetter] = useState<string>("");

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    nameSetter(event.target.value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    window.localStorage.setItem("username", name || "Anonymous");
    history.push("/");

    event.preventDefault();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <span className="welcome_title">Choose your name</span>
        <Hint>choose whatever name you like, this will show publicly</Hint>
        <NameTextbox value={name} onChange={onNameChange} />
        <SubmitButton value={name === "" ? "Continue as anonymous" : "Enter"} />
      </Form>
    </>
  );
}

const TitleBlock = styled.div`
  display: inline-block;
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 4px;
`;

function FirstSlide({ pageSetter }: PageProps) {
  return (
    <>
      {/* <span className="welcome_title">Choose your name</span> */}
      <h1 className="welcome_title">
        Welcome to <TitleBlock>Write Letter</TitleBlock>
      </h1>
      <p>Write Letter is where you can write anything openly and anonymously</p>
      <Hint>Choose your name to get start, no sign up required.</Hint>
      <StartButton value="Get Started" onClick={() => pageSetter(1)} />
    </>
  );
}

export default Welcome;
