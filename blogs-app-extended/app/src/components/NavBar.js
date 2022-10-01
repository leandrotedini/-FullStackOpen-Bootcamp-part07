import React from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import BlogList from './Blogs/BlogList'
import UserList from './Users/UserList'

const NavBar = () => {

  const padding = {
    paddingRight: 5
  }

  return(
    <div>
      <Router>
        <Link style={padding} to="/">Blogs</Link>
        <Link style={padding} to="users">users</Link>
        <Routes>
          <Route path="/" element={<BlogList/>} />
          <Route path="/users" element={<UserList/>} />
        </Routes>
      </Router>
    </div>
  )
}
export default NavBar