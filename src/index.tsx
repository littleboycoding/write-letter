import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider } from "@apollo/client";

import cache from "./cache";

const ApolloAddress =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/graphql"
    : process.env.REACT_APP_APOLLO_URL || "http://localhost:4000/graphql";

const client = new ApolloClient({
  cache,
  uri: ApolloAddress,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
