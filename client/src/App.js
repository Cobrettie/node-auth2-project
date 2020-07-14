import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

// fetch('http://localhost:5000/')
//   .then(response => console.log(response))
//   .catch(err => console.log(err))

function SignUp() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    department: ''
  })

  function onChange(event) {
    setCredentials({
      ...credentials,
      [event.target.name] : event.target.value
    })
  }

  function onSubmit(event) {
    event.preventDefault();

    fetch('http://localhost:5000/register')
      .then(response => {
        return <h2>Account registered!</h2>
      })
      .catch(err => {
        console.log('Error: ', err)
      })
  }

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <input 
            type='text'
            name='username'
            onChange={onChange}
            value={credentials.username}
            placeholder='username'
          />

          <input 
            type='text'
            name='password'
            onChange={onChange}
            value={credentials.password}
            placeholder='password'
          />

          <input 
            type='text'
            name='department'
            onChange={onChange}
            placeholder='department'
          />
        </form>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Users - Node auth2 Project</h1>
      <SignUp />
    </div>
  );
}

export default App;
