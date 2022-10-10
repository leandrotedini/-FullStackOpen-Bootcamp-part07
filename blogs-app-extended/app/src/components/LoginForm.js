import React, { useState } from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { loginUser } from '../features/users/userLoggedSlice'
import { setNotification } from '../features/notification/notificationSlice'
import RegisterForm from './RegisterForm'


const LoginForm = () => {
  const [showRegister, setShowRegister] = useState(false)
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(
        loginUser({
          username: username.value,
          password: password.value
        })
      )
      resetUsername()
      resetPassword()
    } catch (exception) {
      dispatch(setNotification({
        message: exception.response.data.error,
        success: false
      }))
    }
  }

  return <>
    {showRegister
      ? <RegisterForm />
      : <>
        <h2>log in to application</h2>
        <form data-test-id='login-form' onSubmit={handleLogin}>
          <div>
            username
            <input { ...username } />
          </div>
          <div>
            password
            <input { ...password } />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    }
    <button onClick={() => setShowRegister(!showRegister)}>
      {showRegister ? 'cancel' : 'create acount'}
    </button>
  </>
}

export default LoginForm