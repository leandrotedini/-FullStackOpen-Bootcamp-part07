import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBlogs, selectAllBlogs } from '../features/blogs/blogsSlice'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogsList = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectAllBlogs)

  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  // const addBlog = (newBlog) => {
  //   // setBlogs([ ...blogs, newBlog ].sort(sortFunction))
  //   showNotification({
  //     message: `a new blog ${newBlog.title} by ${newBlog.author}`,
  //     success: true
  //   })
  // }

  return <>
    <h2>blogs</h2>
    <div data-test-id="blog-list">
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
      <BlogForm/>
    </div>
  </>
}

export default BlogsList