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
  async newBlog => await blogService.create(newBlog))

export const deleteBlogs = createAsyncThunk('blogs/delete',
  async id => {
    await blogService.deleteBlog(id)
    return id
  })

export const fetchBlogsComments = createAsyncThunk('blogs/fetchBlogsComments',
  async blogId => {
    const comments = await blogService.getAllComments(blogId)
    return { blogId, comments }
  })

export const createBlogsComments = createAsyncThunk('blogs/createBlogsComments',
  async newComment => await blogService.createComment(newComment))

export const likeBlogs = createAsyncThunk('blogs/like',
  async blogId => {
    await blogService.likeBlog(blogId)
    return blogId
  })

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
      .addCase(fetchBlogsComments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchBlogsComments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { blogId, comments } = action.payload
        state.blogs = state.blogs.map(blog => {
          if (blog.id === blogId) {
            blog.comments = comments
          }
          return blog
        })
      })
      .addCase(createBlogsComments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createBlogsComments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const blogId = action.payload.blog
        state.blogs = state.blogs.map(blog => {
          if (blog.id === blogId) {
            blog.comments.push(action.payload)
          }
          return blog
        })
      })
      .addCase(likeBlogs.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(likeBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const blogToUpdate = state.blogs.find((blog) => blog.id === action.payload)
        blogToUpdate.likedByUser
          ? blogToUpdate.likes--
          : blogToUpdate.likes++

        blogToUpdate.likedByUser = !blogToUpdate.likedByUser
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