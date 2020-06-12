import React from "react";
import "./App.css";
import { useRoutes } from "hookrouter";
import routes from "./router";
import Header from "./components/Header";

function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className="App">
      <Header></Header>
      {routeResult}
    </div>
  );
}

export default App;
