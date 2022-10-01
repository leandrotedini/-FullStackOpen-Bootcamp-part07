import { configureStore } from '@reduxjs/toolkit'
import userLoggedReducer from './features/users/userLoggedSlice'
import blogsReducer from './features/blogs/blogsSlice'
import usersReducer from './features/users/usersSlice'
import notificationReducer from './features/notification/notificationSlice'

export default configureStore({
  reducer: {
    userLogged: userLoggedReducer,
    blogs: blogsReducer,
    users: usersReducer,
    notification: notificationReducer
  }
})