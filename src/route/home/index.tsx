import React from "react";
import styled from "styled-components";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import DialogContainer from "../../utils/dialog";
import FormatDate from "../../utils/formatDate";

import Username from "./username";
import WriteLetter from "./writeletter";
import Search from "./search";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPencilAlt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

import { gql, useQuery } from "@apollo/client";

import * as GET_LETTERS_TYPES from "./__generated__/GET_LETTERS";

import LetterInfo from "./letterinfo";
import backgroundExample from "../../backgroundExample.jpg";

const Container = styled.div`
  display: grid;
  grid-template-rows: [container-start header-start] 50px [header-end letter-start] 1fr [letter-end footer-start] 50px [footer-end container-end];
  height: 100vh;
`;

const Header = styled.div`
  background-color: black;
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: calc(0.4vw + 1vh + 2.75px);

  @media only screen and (max-width: 800px) {
    font-size: calc(1vw + 1vh + 3px);
    span:first-child {
      display: none;
    }
  }
`;

const Title = styled.span``;
const Button = styled(FontAwesomeIcon).attrs(({ icon }) => ({
  icon,
}))`
  background-color: #444;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  color: white;
  transition: all 0.3s;
  margin: 0 5px;

  &:hover {
    background-color: #666;
    transition: all 0.3s;
    cursor: pointer;
  }
`;

const Content = styled.div`
  overflow-x: hidden;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #ccc;
  // background-image: url(${backgroundExample});
  background-size: cover;
`;

const LetterContainer = styled.div`
  align-self: stretch;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;

  padding: 10px;

  a {
    text-decoration: none;
    color: black;
  }
`;

const Letter = styled.div`
  padding: 10px;
  // border: 1px solid #ddd;
  min-height: 150px;
  border-radius: 5px;
  font-size: 1.1em;
  background-color: rgba(255, 255, 255, 0.9);
  background-color: #fff;

  word-wrap: break-word;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.2s;

  .user {
    margin-top: 15px;
    font-size: 0.9em;
    text-decoration: underline;
  }

  .date {
    margin-top: 5px;
    font-size: 0.8em;
  }

  &:hover {
    background-color: #eee;
    cursor: pointer;
    transition: all 0.2s;
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

const MoreButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 3px;
  padding: 10px 15px;
  font-size: 1em;
  border: none;
  justify-self: center;
  transition: background-color 0.3s;
  margin: 10px 0px 20px 0px;

  &:hover {
    background-color: #555;
    cursor: pointer;
    transition: background-color 0.3s;
  }
`;

const GET_LETTERS = gql`
  query GET_LETTERS($cursor: ID, $limit: Int) {
    getLetters(cursor: $cursor, limit: $limit) {
      cursor
      limit
      hasMore
      letters {
        id
        content
        writer
        date
      }
    }
  }
`;

function LetterStyled({
  data,
}: {
  data: GET_LETTERS_TYPES.GET_LETTERS_getLetters;
}): JSX.Element {
  const { letters } = data;

  const LetterList =
    letters?.length > 0 ? (
      letters.map(
        (letter: GET_LETTERS_TYPES.GET_LETTERS_getLetters_letters) => {
          const content =
            letter.content.length < 100
              ? letter.content
              : letter.content.slice(0, 101) + " . . .";
          const date = FormatDate(new Date(letter.date));

          return (
            <Link key={letter.id} to={`/letter/${letter.id}`}>
              <Letter>
                <span>{content}</span>
                <div>
                  <span className="user">{letter.writer}</span>
                  <br />
                  <span className="date">Written {date}</span>
                </div>
              </Letter>
            </Link>
          );
        }
      )
    ) : (
      <span>No one write any letter yet !</span>
    );

  return <>{LetterList}</>;
}

const Footer = styled.div`
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  font-size: calc(0.5vw + 1.1vh);
`;

function DialogSwitch() {
  return (
    <Switch>
      <Route
        path={`/letter/:LETTER_ID`}
        children={
          <DialogContainer overflow={1}>
            <LetterInfo />
          </DialogContainer>
        }
      />
      <Route
        path={`/search`}
        children={
          <DialogContainer>
            <Search />
          </DialogContainer>
        }
      />
      <Route
        path={`/username`}
        children={
          <DialogContainer>
            <Username />
          </DialogContainer>
        }
      />
      <Route
        path={`/write`}
        children={
          <DialogContainer>
            <WriteLetter />
          </DialogContainer>
        }
      />
    </Switch>
  );
}

function Home() {
  const { data, loading, error, fetchMore } = useQuery<
    GET_LETTERS_TYPES.GET_LETTERS,
    GET_LETTERS_TYPES.GET_LETTERSVariables
  >(GET_LETTERS, {
    variables: {
      cursor: null,
      limit: 10,
    },
  });

  if (error) return <span>{error.message}</span>;

  if (!window.localStorage.getItem("username"))
    return <Redirect to="/welcome" />;

  function loadMore() {
    fetchMore({
      variables: {
        cursor: data ? data.getLetters.cursor : null,
      },
    });
  }

  return (
    <Container>
      <Header>
        <Title>Write Letter</Title>
        <UserStyled />
        <div>
          <Link to="/search">
            <Button icon={faPaperPlane} />
          </Link>
          <Link to="/write">
            <Button icon={faPencilAlt} />
          </Link>
        </div>
      </Header>
      <Content>
        <LetterContainer>
          {!loading && data ? (
            <LetterStyled data={data.getLetters} />
          ) : (
            <span>Loading</span>
          )}
        </LetterContainer>
        {!loading && data?.getLetters?.hasMore && (
          <MoreButton onClick={loadMore}>More</MoreButton>
        )}
      </Content>
      <Footer>Made by @littleboycoding, deployed to DigitalOcean 🐳</Footer>
      <DialogSwitch />
    </Container>
  );
}

export default Home;
