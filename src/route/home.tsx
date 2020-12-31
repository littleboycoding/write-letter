import React from "react";
import styled from "styled-components";
import { Link, Redirect, Route } from "react-router-dom";
import DialogContainer from "../dialog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";

import { gql, useQuery } from "@apollo/client";

interface Letter {
  id: string;
  content: string;
  writer: string;
}

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
  // box-shadow: 0px 0px 2px 1px #444;
`;

const Title = styled.span``;
const Write = styled(FontAwesomeIcon).attrs(() => ({
  icon: faPencilAlt,
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

const User = styled.div`
  a {
    color: white;
    text-decoration: none;
  }

  &:hover {
    background-color: #666;
    cursor: pointer;
    transition: background-color 0.3s;
    padding: 5px 10px;
    border-radius: 3px;
  }
`;

function UserStyled() {
  const Name = window.localStorage.getItem("username");

  return (
    <User>
      <Link to="/username">
        <FontAwesomeIcon icon={faUserAlt} /> <span>{Name}</span>
      </Link>
    </User>
  );
}

const GET_LETTERS = gql`
  query GET_LETTERS {
    letters {
      id
      content
      writer
    }
  }
`;

function Home() {
  const { data, loading, error } = useQuery<{ letters: Letter[] }>(GET_LETTERS);

  if (error) return <span>{error.message}</span>;

  if (!window.localStorage.getItem("username"))
    return <Redirect to="/welcome" />;

  if (data && !loading) {
    console.log(data);
    const LetterList =
      data.letters?.length > 0
        ? data.letters.map((letter: Letter) => (
            <Letter key={letter.id}>
              {letter.content}
              <span className="user">{letter.writer}</span>
              <span className="date">On 30 December 2020, At 23:14</span>
            </Letter>
          ))
        : [];

    return (
      <Container>
        <Header>
          <Title>Write Letter</Title>
          <UserStyled />
          <Link to="/write">
            <Write />
          </Link>
        </Header>
        <LetterContainer>{LetterList}</LetterContainer>
        <Route path={`/:method`} component={DialogContainer} />
      </Container>
    );
  }

  return <span>Loading</span>;
}

export default Home;
