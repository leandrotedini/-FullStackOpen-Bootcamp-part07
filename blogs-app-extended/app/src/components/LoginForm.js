import React, { useState } from 'react'
import loginService  from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogListappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired
}

export default LoginForm