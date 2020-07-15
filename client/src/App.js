import React, { useEffect, useState } from 'react'
import NavMenu from './components/NavMenu/NavMenu.js'
import SignUp from './components/signup/SignUp.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <NavMenu />
      <h1>Users - Node auth2 Project</h1>
    </div>
  );
}

export default App;
