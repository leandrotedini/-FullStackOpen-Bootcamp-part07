import React from 'react'
import { useField } from '../hooks'
import userSevice from '../services/users'
import { useDispatch } from 'react-redux'
import { loginUser } from '../features/users/userLoggedSlice'
import { setNotification } from '../features/notification/notificationSlice'

const RegisterForm = () => {

  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetName, ...name } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const dispatch = useDispatch()


  const handleRegister = async event => {
    event.preventDefault()

    try {
      await userSevice.create({
        username: username.value,
        name: name.value,
        password: password.value
      })

      dispatch(loginUser({
        username: username.value,
        password: password.value
      }))

      resetUsername()
      resetName()
      resetPassword()

    } catch (exception) {
      dispatch(setNotification({
        message: exception.response.data.error,
        success: false
      }))
    }
  }

  return <>
    <form onSubmit={handleRegister}>
      <div>
        Username
        <input { ...username } />
      </div>
      <div>
        Name
        <input { ...name } />
      </div>
      <div>
        Password
        <input { ...password } />
      </div>
      <button>Register</button>
    </form>
  </>
}

export default RegisterForm