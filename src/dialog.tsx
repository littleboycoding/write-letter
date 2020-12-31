import React, { ChangeEvent, FormEvent, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

interface Letter {
  id: string;
  content: string;
  writer: string;
}

const flyToDown = keyframes`
  from {
    transform: translateY(-75%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
  `;

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
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const DialogBackground = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  animation: ${fadeIn} 0.5s;
`;

const Dialog = styled.div`
  position: relative;
  background-color: white;
  max-width: 85%;
  max-height: 85%;
  overflow: hidden;
  border-radius: 10px;
  padding: 10px;
  z-index: 1;

  animation: ${flyToDown} 1s;
`;

function DialogContainerStyled() {
  const dialog = <DialogStyled />;
  const history = useHistory();

  return dialog ? (
    <DialogContainer>
      <DialogBackground onClick={() => history.push("/")} />
      <Dialog>{dialog}</Dialog>
    </DialogContainer>
  ) : null;
}

function DialogStyled() {
  const params = useParams<{ method: string }>();

  switch (params.method) {
    case "write":
      return <WriteFormStyled />;
    case "username":
      return <NameFormStyled />;
    default:
      return null;
  }
}

//On Dialog Content

const WriteForm = styled.form`
  display: flex;
  flex-direction: column;

  textarea {
    resize: none;
    margin: 10px 0;
    border: 1px solid #ddd;
  }

  button {
    background-color: green;
    color: white;
    border: none;
    transition: background-color 0.3s;
  }

  button,
  textarea {
    border-radius: 5px;
    padding: 10px;
  }

  button:hover {
    background-color: #004400;
    transition: background-color 0.3s;
    cursor: pointer;
  }

  button[disabled] {
    background-color: grey !important;
  }
`;

const WRITE_LETTER = gql`
  mutation WRITE_LETTER($content: String!, $writer: String!) {
    writeLetter(content: $content, writer: $writer) {
      id
      content
      writer
    }
  }
`;

function WriteFormStyled() {
  const history = useHistory();
  const [content, contentSetter] = useState<string>("");
  const [write] = useMutation<{ writeLetter: Letter }>(WRITE_LETTER, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          letters(exisitngLetters) {
            if (data?.writeLetter)
              return [...exisitngLetters, data.writeLetter];
          },
        },
      });
    },
  });

  function onContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    contentSetter(event.target.value);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await write({
      variables: {
        content,
        writer: window.localStorage.getItem("username"),
      },
    });

    contentSetter("");
    history.push("/");
  }

  return (
    <WriteForm onSubmit={onSubmit}>
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
      />
      <button type="submit" disabled={!content}>
        Write
      </button>
    </WriteForm>
  );
}

const NameForm = styled.form`
  display: flex;
  flex-direction: column;

  #name {
    resize: none;
    margin: 10px 0;
    border: 1px solid #ddd;
  }

  button {
    background-color: green;
    color: white;
    border: none;
    transition: background-color 0.3s;
  }

  button,
  #name {
    border-radius: 5px;
    padding: 10px;
  }

  button:hover {
    background-color: #004400;
    transition: background-color 0.3s;
    cursor: pointer;
  }
`;

function NameFormStyled() {
  const history = useHistory();

  const [name, nameSetter] = useState<string | null>(
    window.localStorage.getItem("username")
  );

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    nameSetter(event.target.value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    window.localStorage.setItem("username", name || "Anonymous");
    nameSetter("");
    history.push("/");

    event.preventDefault();
  }

  return (
    <NameForm onSubmit={onSubmit}>
      <label htmlFor="name">
        <b>Change username</b>
      </label>
      <input
        id="name"
        maxLength={50}
        value={name || ""}
        onChange={onNameChange}
        placeholder="Your desired username"
        autoComplete="off"
      />
      <button type="submit">{name ? "Update" : "Be anonymous"}</button>
    </NameForm>
  );
}

export default DialogContainerStyled;
