import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../features/users/usersSlice'

const LoginForm = ({ showNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(
        loginUser({ username, password })
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification({
        message: `${exception.response.data.error}`,
        success: false
      })
    }
  }

  return <>
    <h2>log in to application</h2>
    <form data-test-id='login-form' onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </>
}

export default LoginForm