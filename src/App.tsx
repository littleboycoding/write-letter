import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

const Welcome = lazy(() => import("./route/welcome"));
const Home = lazy(() => import("./route/home"));

function Loading() {
  return <span>Loading</span>;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router basename={"/"}>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
