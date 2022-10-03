import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'

const initialState = {
  blogs: [],
  status: 'idle',
  error: null
}

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs',
  async () => await blogService.getAll())

export const createBlogs = createAsyncThunk('blogs/create',
  async (newBlog) => await blogService.create(newBlog))

export const deleteBlogs = createAsyncThunk('blogs/delete',
  async (id) => {
    await blogService.deleteBlog(id)
    return id
  })

export const likeBlogs = createAsyncThunk('blogs/like',
  async (blog) => await blogService.update({ ...blog, likes: blog.likes + 1 }))

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = action.payload
      })
      .addCase(createBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = state.blogs.concat(action.payload)
      })
      .addCase(deleteBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload)
      })
      .addCase(likeBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(likeBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { id } = action.payload
        const blogToUpdate = state.blogs.find((blog) => blog.id === id)
        if (blogToUpdate) {
          blogToUpdate.likes++
        }
      })
      .addCase(likeBlogs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectAllBlogs = state => state.blogs.blogs
export const selectBlogById = (state, id) => state.blogs.blogs.find((blog) => blog.id === id)
export const selectBlogByUserId = (state, id) => state.blogs.blogs.filter((blog) => blog.user.id === id)
export const { getBlogs } = blogsSlice.actions
export default blogsSlice.reducer