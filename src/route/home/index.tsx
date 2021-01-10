import React, { ChangeEvent, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import DialogContainer from "../../utils/dialog";
import FormatDate from "../../utils/formatDate";

import Username from "./username";
import WriteLetter from "./writeletter";
import Search from "./search";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faPaperPlane,
  faPencilAlt,
  faSun,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

import { gql, useQuery } from "@apollo/client";

import * as GET_LETTERS_TYPES from "./__generated__/GET_LETTERS";

import LetterInfo from "./letterinfo";
import backgroundExample from "../../backgroundExample.jpg";

import ReactLoading from "react-loading";

const Container = styled.div`
  color: ${(props) => props.theme.color};
  display: grid;
  grid-template-rows: [container-start header-start] min-content [header-end letter-start] 1fr [letter-end footer-start] 50px [footer-end container-end];
  height: 100vh;
`;

const Header = styled.div`
  background-color: ${(props) => props.theme.bar};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: calc(0.4vw + 1vh + 2.75px);
  flex-wrap: wrap;

  @media only screen and (max-width: 800px) {
    font-size: calc(1vw + 1vh + 3px);
    span:first-child {
      display: none;
    }

    & {
      justify-content: center;
    }

    & > * {
      margin: 5px;
    }
  }
`;

const Title = styled.span``;
const Button = styled(FontAwesomeIcon).attrs(({ icon }) => ({
  icon,
}))`
  background-color: ${(props) => props.theme.button};
  border: none;
  padding: 7px 10px;
  border-radius: 3px;
  color: white;
  transition: all 0.3s;
  margin: 0 5px;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
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

  // background-image: url(${backgroundExample});
  background-color: ${(props) => props.theme.background};
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
  background-color: ${(props) => props.theme.letter};
  color: ${(props) => props.theme.color};

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
    background-color: ${(props) => props.theme.letterHover};
    cursor: pointer;
    transition: all 0.2s;
  }
`;

const User = styled.div`
  a {
    color: ${(props) => props.theme.color};
    text-decoration: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
    transition: background-color 0.3s;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 3px;
  }

  &:hover > a {
    color: white;
    transition: color 0.3s;
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
    background-color: #333;
    cursor: pointer;
    transition: background-color 0.3s;
  }
`;

const GET_LETTERS = gql`
  query GET_LETTERS($cursor: ID, $limit: Int, $hashtag: String) {
    getLetters(cursor: $cursor, limit: $limit, hashtag: $hashtag) {
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
  hashtag,
}: {
  data: GET_LETTERS_TYPES.GET_LETTERS_getLetters;
  hashtag: string;
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
      <BackMessage>
        {!hashtag
          ? "No one write any letter yet !"
          : "No letter with matched hashtags"}
      </BackMessage>
    );

  return <>{LetterList}</>;
}

const BackMessage = styled.span`
  opacity: 0.4;
  margin-top: 10px;
  font-family: monospace;
  font-size: 3.2vw;
  grid-column: 1 / end;
  grid-row: 1 / end;
  justify-self: center;
  align-self: center;
`;

const Footer = styled.div`
  background-color: ${(props) => props.theme.bar};
  display: flex;
  align-items: center;
  padding: 0px 10px;
  font-size: calc(0.5vw + 1.1vh);
  justify-content: space-between;

  button {
    background-color: transparent;
    color: ${(props) => props.theme.color};
    border: none;
    font-size: 1em;
    transition: all 0.1s;
  }

  button:hover {
    cursor: pointer;
    font-size: 1.05em;
    transition: all 0.1s;
  }
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

const NavBT = styled.div`
  display: flex;
  align-items: center;
`;

const HashtagSearch = styled.input.attrs(() => ({
  type: "text",
  placeholder: "Search by hashtag",
}))`
  padding: 5px;
  border-radius: 3px;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  height: 100%;
  font-size: 0.8em;
  background-color: ${(props) => props.theme.textBox};
  border: 1px solid #aaa;
`;

const DarkTheme = {
  bar: "black",
  background: "#555",
  color: "white",
  letter: "rgba(50, 50, 50, 0.8)",
  letterInfo: "rgba(50, 50, 50)",
  letterHover: "rgba(30, 30, 30, 0.8)",
  button: "#444",
  buttonHover: "#666",
  comment: "#555",
  commentBorder: "#888",
  textBox: "#eee",
};

const LightTheme = {
  bar: "white",
  background: "#ccc",
  color: "black",
  letter: "rgba(255, 255, 255, 1)",
  letterInfo: "rgba(255, 255, 255)",
  letterHover: "rgba(230, 230, 230, 0.8)",
  button: "#444",
  buttonHover: "#666",
  comment: "#efefef",
  commentBorder: "#aaa",
  textBox: "#eee",
};

function Home() {
  const [hashtag, hashtagSetter] = useState<string>("");
  const { data, loading, error, fetchMore } = useQuery<
    GET_LETTERS_TYPES.GET_LETTERS,
    GET_LETTERS_TYPES.GET_LETTERSVariables
  >(GET_LETTERS, {
    variables: {
      cursor: null,
      limit: 10,
      hashtag,
    },
  });
  const [theme, themeSetter] = useState(
    window.localStorage.getItem("theme") || "light"
  );

  // useEffect(() => {
  //   const timer = setTimeout(
  //     () => refetch({ hashtag, cursor: null, limit: 10 }),
  //     500
  //   );
  //   return () => clearTimeout(timer);
  // }, [hashtag, refetch]);

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

  function onHashtagChange(event: ChangeEvent<HTMLInputElement>) {
    hashtagSetter(event.target.value);
  }

  function themeSwap() {
    if (window.localStorage.getItem("theme") !== "dark") {
      window.localStorage.setItem("theme", "dark");
      themeSetter("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      themeSetter("light");
    }
  }

  return (
    <ThemeProvider theme={theme !== "dark" ? LightTheme : DarkTheme}>
      <Container>
        <Header>
          <Title>Write Letter</Title>
          <UserStyled />
          <NavBT>
            <HashtagSearch value={hashtag} onChange={onHashtagChange} />
            <Link to="/search">
              <Button icon={faPaperPlane} />
            </Link>
            <Link to="/write">
              <Button icon={faPencilAlt} />
            </Link>
          </NavBT>
        </Header>
        <Content>
          <LetterContainer>
            {!loading && data ? (
              <LetterStyled hashtag={hashtag} data={data.getLetters} />
            ) : (
              <div style={{ gridColumn: "1 / end", justifySelf: "center" }}>
                <ReactLoading />
              </div>
            )}
          </LetterContainer>
          {!loading && data?.getLetters?.hasMore && (
            <MoreButton onClick={loadMore}>More</MoreButton>
          )}
        </Content>
        <Footer>
          Made by @littleboycoding, deployed to DigitalOcean 🐳{" "}
          <button onClick={themeSwap}>
            {theme === "light" ? "Light mode " : "Dark Mode "}
            <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} />
          </button>
        </Footer>
        <DialogSwitch />
      </Container>
    </ThemeProvider>
  );
}

export default Home;
