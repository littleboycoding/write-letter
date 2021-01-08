import { lazy } from "react";

const Welcome = lazy(() => import("./welcome/index"));
const Home = lazy(() => import("./home/index"));

export { Welcome, Home };
