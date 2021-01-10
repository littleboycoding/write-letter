import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import styled from "styled-components";

import { Home, Welcome } from "./route/route";

import Loader from "./utils/loading";

const Loading = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router basename={"/"}>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/" component={Home} />

          <Redirect to="/" />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
