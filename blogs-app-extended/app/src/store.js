import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './features/blogs/blogsSlice'
import usersReducer from './features/users/usersSlice'
import notificationReducer from './features/notification/notificationSlice'

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    notification: notificationReducer
  }
})