import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Home, Welcome } from "./route/route";

function Loading() {
  return <span>Loading</span>;
}

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
