import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, logout } from './features/users/usersSlice'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState({ message:null, success:null })
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const userLogout = () => {
    dispatch(logout())
  }

  const showNotification = ({ message, success }) => {
    setNotificationMessage({ message, success })
    setTimeout(() => {
      setNotificationMessage({ message:null, success:null })
    }, 5000)
  }

  return (
    <div>
      <Notification message={notificationMessage.message} success={notificationMessage.success}/>
      {user === null
        ? <LoginForm showNotification={showNotification}/>
        : <>
          <p>{`${user.name} logged in`}</p>
          <button onClick={userLogout}>Logout</button>
          <BlogList user={user}/>
        </>
      }
    </div>
  )
}

export default App
