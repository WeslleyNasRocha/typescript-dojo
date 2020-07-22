import React from 'react';
import './App.css';
import logo from './logo.svg';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link to="/app/localTodo">Go to app</Link>
      </header>
    </div>
  );
}

export default App;
