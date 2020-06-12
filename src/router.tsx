import React from "react";
import History from "./components/History";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const routes = {
  "/": () => <Dashboard />,
  "/history": () => <History />,
  "/login": () => <Login />
};

export default routes;
