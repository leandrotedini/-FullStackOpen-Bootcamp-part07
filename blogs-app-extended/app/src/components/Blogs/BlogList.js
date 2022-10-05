import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchBlogs, selectAllBlogs } from '../../features/blogs/blogsSlice'
import BlogForm from './BlogForm'

const BlogsList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectAllBlogs)

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return <>
    <h2>blogs</h2>
    <div data-test-id="blog-list">
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
        </div>
      )}
      <BlogForm/>
    </div>
  </>
}

export default BlogsList