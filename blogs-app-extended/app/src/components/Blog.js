import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {

  const [ visible, setVisible ] = useState(false)
  const [ likes, setLikes ] = useState(blog.likes)
  const [ deletedBlog, setDeletedBlog ] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  let buttonName = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLikes = (blog) => {
    const updatedBlog = { ...blog, likes: likes + 1 }

    blogService.update(updatedBlog)
      .then( () =>  setLikes(prevState => prevState + 1))
      .catch(e => console.log(e))
  }

  const deleteBlog = blog => {
    if (window.confirm(`Remove ${blog.title}`)) {
      blogService.deleteBlog(blog)
        .then(() =>  setDeletedBlog(true))
        .catch(e => console.log(e))
    }
  }

  return (
    deletedBlog
      ? null
      : <div style={blogStyle}>
        <p>{blog.title} <button onClick={toggleVisibility}>{buttonName}</button></p>
        <div style={showWhenVisible}>
          <div>
            <span>{`URL: ${blog.url}`}</span>
          </div>
          <div>
            <span>{`Likes: ${likes}`}</span><button onClick={() => incrementLikes(blog)}>like</button>
          </div>
          <div>
            <span>{`Author: ${blog.author}`}</span>
            { blog.user.username === user.username && <div><button onClick={() => deleteBlog(blog)}>remove</button></div> }
          </div>
        </div>
      </div>
  )
}

export default Blog