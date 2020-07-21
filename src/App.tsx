import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link to="/app/todos">Go to app</Link>
      </header>
    </div>
  );
}

export default App;
