import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserLogged } from './features/users/userLoggedSlice'
import { BrowserRouter as Router } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import AppRoutes from './components/AppRoutes'
import { Container } from '@chakra-ui/react'
import NavBar from './components/NavBar'

const App = () => {
  const user = useSelector(selectUserLogged)


  return (
    <Router>
      <Notification />
      {user === null
        ? <LoginForm />
        : <>
          <NavBar />
          <Container>
            <AppRoutes />
          </Container>
        </>
      }
    </Router>
  )
}

export default App
