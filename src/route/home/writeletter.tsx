import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { gql, Reference, useMutation } from "@apollo/client";

import * as WRITE_LETTER_TYPES from "./__generated__/WRITE_LETTER";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPaperPlane, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const WriteForm = styled.form`
  display: flex;
  flex-direction: column;

  textarea {
    padding: 10px;
    resize: none;
    margin: 10px 0;
    border: 1px solid #ddd;
  }
`;

const WriteButtonContainer = styled.div`
  display: grid;
  grid-template-columns: [post-start] 1fr [post-end paper-start] 1fr [paper-end];
  grid-gap: 15px;
`;

const WriteButton = styled.button.attrs(() => ({
  type: "button",
}))`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: flex-start;
  align-items: center;
  font-size: calc(0.5vw + 0.5vh + 10px);
  background-color: ${(props) => (props.name === "post" ? "green" : "blue")};

  &:hover {
    background-color: ${(props) =>
      props.name === "post" ? "darkgreen" : "darkblue"};
  }

  span {
    font-size: calc(0.5em + 5px);
    grid-column: 1 / 3;
    padding: 10px;
  }

  big {
  }

  svg {
    justify-self: center;
    color: #ccc;
  }

  color: white;
  border: none;
  transition: background-color 0.3s;
  border-radius: 5px;
  padding: 10px;

  &:hover {
    transition: background-color 0.3s;
    cursor: pointer;
  }

  &[disabled] {
    background-color: grey !important;
  }
`;

const WRITE_LETTER = gql`
  mutation WRITE_LETTER($content: String!, $writer: String!, $method: String!) {
    writeLetter(content: $content, writer: $writer, method: $method) {
      id
      content
      writer
      date
      method
    }
  }
`;

function WriteFormStyled() {
  const history = useHistory();
  const [content, contentSetter] = useState<string>("");
  const [write, { loading }] = useMutation<
    WRITE_LETTER_TYPES.WRITE_LETTER,
    WRITE_LETTER_TYPES.WRITE_LETTERVariables
  >(WRITE_LETTER, {
    update(cache, { data }) {
      if (data)
        cache.modify({
          fields: {
            getLetters(
              exisitngLetters = { offset: 0, limit: 10, letters: [] }
            ) {
              if (data.writeLetter.method === "paper_plane")
                return { ...exisitngLetters };

              const { writeLetter } = data;
              const newLettersRef = cache.writeFragment({
                data: writeLetter,
                fragment: gql`
                  fragment NewLetters on Letter {
                    id
                    content
                    writer
                    date
                  }
                `,
              });

              const letters: Reference[] = [
                newLettersRef,
                ...exisitngLetters.letters,
              ];

              return {
                ...exisitngLetters,
                offset: letters.length,
                letters,
              };
            },
          },
        });
    },
  });

  function onContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    contentSetter(event.target.value);
  }

  async function onSubmit(method: "post" | "paper_plane" = "post") {
    await write({
      variables: {
        content,
        writer: window.localStorage.getItem("username") || "Anonymous",
        method,
      },
    });

    contentSetter("");
    history.push("/");
    return;
  }

  return (
    <WriteForm>
      <label htmlFor="content">
        <b>Write</b>
      </label>
      <ul>
        <big>
          <b>Rule</b>
        </big>
        <li>Stay polite</li>
        <li>That's it</li>
      </ul>
      <textarea
        cols={100}
        rows={5}
        id="content"
        maxLength={250}
        value={content}
        onChange={onContentChange}
        placeholder="Write anything you want"
        disabled={loading}
      />
      <WriteButtonContainer>
        <WriteButton
          name="post"
          onClick={() => onSubmit("post")}
          disabled={!content || loading}
        >
          <div>
            <FontAwesomeIcon icon={faPencilAlt} /> <big>Post</big>
          </div>
          <span>post to the board as normally</span>
        </WriteButton>
        <WriteButton
          name="paper_plane"
          onClick={() => onSubmit("paper_plane")}
          disabled={!content || loading}
        >
          <div>
            <FontAwesomeIcon icon={faPaperPlane} /> <big>Paper plane</big>
          </div>
          <span>send to the sky, then landed to someone</span>
        </WriteButton>
      </WriteButtonContainer>
    </WriteForm>
  );
}

export default WriteFormStyled;
