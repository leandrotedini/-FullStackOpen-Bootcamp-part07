import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogsList = ({ showNotification, user }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(sortFunction) )
    )
  }, [])

  const addBlog = (newBlog) => {
    setBlogs([ ...blogs, newBlog ].sort(sortFunction))
    showNotification({
      message: `a new blog ${newBlog.title} by ${newBlog.author}`,
      success: true
    })
  }

  const sortFunction = (a, b) => {
    if (a.likes < b.likes) return 1
    if (a.likes > b.likes) return -1

    return 0
  }
  return <>
    <h2>blogs</h2>
    <div data-test-id="blog-list">
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
      <BlogForm addBlog={addBlog}/>
    </div>
  </>
}

export default BlogsList