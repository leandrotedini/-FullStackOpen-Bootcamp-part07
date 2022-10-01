import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserLogged, logout } from './features/users/userLoggedSlice'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import NavBar from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUserLogged)

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
          <NavBar />
        </>
      }
    </div>
  )
}

export default App
