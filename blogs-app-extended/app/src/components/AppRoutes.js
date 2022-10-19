import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserLogged } from '../features/users/userLoggedSlice'
import BlogList from './Blogs/BlogList'
import Blog from './Blogs/Blog'
import UserList from './Users/UserList'
import User from './Users/User'
import Login from './Login'
import RegisterForm from './RegisterForm'

const AppRoutes = () => {
  const user = useSelector(selectUserLogged)
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) navigate('/login')
  }, [user])

  return (
    <Routes>
      <Route path="/" element={<BlogList/>} />
      <Route path="login" element={<Login/>} />
      <Route path="signup" element={<RegisterForm/>} />
      <Route path='blogs/:id' element={<Blog />} />
      <Route path='users' element={<UserList/>} />
      <Route path='users/:id' element={<User />} />
    </Routes>
  )
}

export default AppRoutes