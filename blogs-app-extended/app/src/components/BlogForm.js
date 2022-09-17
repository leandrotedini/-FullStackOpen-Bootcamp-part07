import React, { useState, useRef } from 'react'
import blogService  from '../services/blogs'
import Togglable from './Togglable'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const newBlog = { title, author, url }

    try {
      const blog = await blogService.create(newBlog)
      addBlog(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      console.log(exception)
    }
  }

  return <>
    <Togglable buttonLabel={'new blog'} ref={blogFormRef} >
      <h2>create new</h2>
      <form data-test-id="blog-form" onSubmit={handleCreateBlog}>
        <div>
          <label>Title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>Author:
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>URL:
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  </>
}

export default BlogForm