import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, logout } from './features/users/usersSlice'
import BlogList from './components/Blogs/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const userLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Notification />
      {user === null
        ? <LoginForm />
        : <>
          <p>{`${user.name} logged in`}</p>
          <button onClick={userLogout}>Logout</button>
          <BlogList/>
        </>
      }
    </div>
  )
}

export default App
