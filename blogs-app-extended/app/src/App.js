import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserLogged, logout } from './features/users/userLoggedSlice'
import { BrowserRouter as Router } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import AppRoutes from './components/AppRoutes'

import NavBar from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUserLogged)

  const userLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Router>
        <Notification />
        {user === null
          ? <LoginForm />
          : <>
            <p>{`${user.name} logged in`}</p>
            <button onClick={userLogout}>Logout</button>
            <NavBar />
            <AppRoutes />
          </>
        }
      </Router>
    </div>
  )
}

export default App
