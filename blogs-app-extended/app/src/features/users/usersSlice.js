import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import loginService from '../../services/login'
import {
  setUserLocalStorage,
  getUserLocalStorage,
  removeUserLocalStorage
} from '../../utils/login_helper'

const initialState = {
  user: getUserLocalStorage(),
  status: 'idle',
  error: null
}

export const loginUser = createAsyncThunk('users/login',
  async user => await loginService.login(user))

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      removeUserLocalStorage()
      state.user = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const user = action.payload
        setUserLocalStorage(user)
        state.user = user
      })
  }
})

export const selectUser = state => state.users.user
export const selectUserToken = state => state.users.user.token
export const { logout } = usersSlice.actions
export default usersSlice.reducer