import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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

  input {
    width: 200px;
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
        maxLength={25}
        value={name || ""}
        onChange={onNameChange}
        placeholder="Your desired username"
        autoComplete="off"
      />
      <button type="submit">{name ? "Update" : "Be anonymous"}</button>
    </NameForm>
  );
}

export default NameFormStyled;
