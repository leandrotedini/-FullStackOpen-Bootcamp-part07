import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBlogs, selectAllBlogs } from '../../features/blogs/blogsSlice'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogsList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectAllBlogs)

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [])

  return <>
    <h2>blogs</h2>
    <div data-test-id="blog-list">
      {blogs.map(blog =>
        <Blog key={blog.id} id={blog.id}/>
      )}
      <BlogForm/>
    </div>
  </>
}

export default BlogsList