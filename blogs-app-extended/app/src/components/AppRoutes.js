import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BlogList from './Blogs/BlogList'
import UserList from './Users/UserList'
import User from './Users/User'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogList/>} />
      <Route path='users' element={<UserList/>} />
      <Route path='users/:id' element={<User />} />
    </Routes>
  )
}

export default AppRoutes