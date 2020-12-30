import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserAlt } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: grid;
  grid-template-rows: [container-start header-start] 50px [header-end letter-start] 1fr [letter-end container-end];
`;

const Header = styled.div`
  background-color: black;
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.1em;
  box-shadow: 0px 0px 2px 1px #444;
`;

const Title = styled.span``; //Nothing for now
const Write = styled(FontAwesomeIcon).attrs(() => ({
  icon: faPlus,
}))`
  background-color: #444;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  color: white;
  transition: all 0.3s;

  &:hover {
    background-color: #666;
    transition: all 0.3s;
    cursor: pointer;
  }
`;

const LetterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;

  padding: 10px;
`;

const Letter = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1.1em;

  display: flex;
  flex-direction: column;

  .user {
    margin-top: 15px;
    font-size: 0.9em;
    text-decoration: underline;
  }
  .date {
    margin-top: 5px;
    font-size: 0.8em;
  }
`;

function User() {
  const Name = window.localStorage.getItem("username");

  return (
    <span>
      <FontAwesomeIcon icon={faUserAlt} /> <span>{Name}</span>
    </span>
  );
}

const firstMessage = `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
const LetterList = [
  <Letter>
    {firstMessage}
    <span className="user">Thanawat Yodnil</span>
    <span className="date">On 30 December 2020, At 23:14</span>
  </Letter>,
  <Letter>
    {firstMessage}
    <span className="user">Thanawat Yodnil</span>
    <span className="date">On 30 December 2020, At 23:14</span>
  </Letter>,
  <Letter>
    {firstMessage}
    <span className="user">Thanawat Yodnil</span>
    <span className="date">On 30 December 2020, At 23:14</span>
  </Letter>,
  <Letter>
    {firstMessage}
    <span className="user">Thanawat Yodnil</span>
    <span className="date">On 30 December 2020, At 23:14</span>
  </Letter>,
];

function Home() {
  if (!window.localStorage.getItem("username"))
    return <Redirect to="/welcome" />;

  return (
    <Container>
      <Header>
        <Title>Write Letter</Title>
        <User />
        <Write />
      </Header>
      <LetterContainer>{LetterList}</LetterContainer>
    </Container>
  );
}

export default Home;
