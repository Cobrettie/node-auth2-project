import React from 'react'
import { Link }from 'react-router-dom'

export default function NavMenu() {
  return (
    <div>
      <nav>
        <Link to='/signup'>sign up</Link>
        <Link to='/signin'>sign in</Link>
      </nav>
    </div>
  )
}