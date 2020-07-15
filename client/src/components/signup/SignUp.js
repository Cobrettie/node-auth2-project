import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function SignUp() {
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

  async function onSubmit(event) {
    event.preventDefault();

    await axios.post('http://localhost:5000/register', credentials)
      .then(response => {
        if (response) {
          document.location = 'http://localhost:3000/signin'
        } else {
          return <h2>sorry</h2>
        }
      })
      .catch(err => {
        console.log(err)
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
            type='password'
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

          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}