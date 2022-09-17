import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({ message:null, success:null })


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogListappUser')
    setUser(null)
    blogService.setToken('')
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
        ? <LoginForm setUser={setUser} showNotification={showNotification}/>
        : <>
          <p>{`${user.name} logged in`}</p>
          <button onClick={logout}>Logout</button>
          <BlogList showNotification={showNotification} user={user}/>
        </>
      }
    </div>
  )
}

export default App
