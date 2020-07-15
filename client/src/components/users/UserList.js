import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    function getUsers() {
      axios.get('http://localhost:5000/users')
        .then(response => {
          console.log(response)
          setUsers(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }

    getUsers()
  }, [])

  if (!localStorage.getItem("token")) {
    document.location = 'http://localhost:3000/login'
  }

  return (
    <div>
      <h2>User List</h2>
      <div>
        {users.map(user => {
          return (
            <div key={user.id}>
              <p>{user.username}</p>
              <p>{user.department}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}