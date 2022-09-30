import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogs, likeBlogs, selectBlogById } from '../features/blogs/blogsSlice'
import { selectUser } from '../features/users/usersSlice'

const Blog = ({ id }) => {

  const [ visible, setVisible ] = useState(false)
  const dispatch = useDispatch()
  const blog = useSelector(state => selectBlogById(state, id))
  const user = useSelector(selectUser)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  let buttonName = visible ? 'hide' : 'view'

  const toggleVisibility = () => setVisible(!visible)

  const incrementLikes = (blog) => dispatch(likeBlogs(blog))

  const deleteBlog = () => {
    if (window.confirm(`Remove ${blog.title}`)) {
      dispatch(deleteBlogs(id))
    }
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={toggleVisibility}>{buttonName}</button></p>
      <div style={showWhenVisible}>
        <div>
          <span>{`URL: ${blog.url}`}</span>
        </div>
        <div>
          <span>{`Likes: ${blog.likes}`}</span><button onClick={() => incrementLikes(blog)}>like</button>
        </div>
        <div>
          <span>{`Author: ${blog.author}`}</span>
          { blog.user.username === user.username && <div><button onClick={deleteBlog}>remove</button></div> }
        </div>
      </div>
    </div>
  )
}

export default Blog