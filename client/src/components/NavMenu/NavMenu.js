import React from 'react'
import { Link }from 'react-router-dom'

export default function NavMenu() {
  return (
    <div>
      <nav>
        <Link to='/register'>sign up</Link>
        <Link to='/login'>sign in</Link>
        <Link to='/users'>users</Link>
      </nav>
    </div>
  )
}