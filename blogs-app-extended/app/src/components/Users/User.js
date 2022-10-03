import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUserById } from '../../features/users/usersSlice'



const User = () => {
  const id = useParams().id
  const user = useSelector(state => selectUserById(state, id))

  if (typeof(user) === 'undefined') return <h1>no records</h1>

  const { blogs } = user

  return(
    <div>
      <h2>{user.username}</h2>

      <h3>added blogs</h3>
      <ul>
        {blogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>


  )
}

export default User