import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import NavMenu from './components/NavMenu/NavMenu.js'
import SignUp from './components/signup/SignUp.js'
import SignIn from './components/signin/SignIn.js'
import UserList from './components/users/UserList.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <NavMenu />
      <h1>Users - Node auth2 Project</h1>

      <Switch>
        <Route path='/register'>
          <SignUp />
        </Route>
        <Route path='/login'>
          <SignIn />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
