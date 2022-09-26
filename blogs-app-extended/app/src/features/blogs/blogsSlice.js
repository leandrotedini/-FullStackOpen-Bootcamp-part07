import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'

const initialState = {
  blogs: [],
  status: 'idle',
  error: null
}

export const getBlogs = createAsyncThunk('blogs/getAll',
  async () => await blogService.getAll())

export const createBlogs = createAsyncThunk('blogs/create',
  async (newBlog) => await blogService.create(newBlog))

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = state.blogs.concat(action.payload)
      })
      .addCase(createBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = state.blogs.concat(action.payload)
      })
  }
})

// export const { getBlogs } = blogsSlice.actions
export const selectAllBlogs = state => state.blogs.blogs
export default blogsSlice.reducer