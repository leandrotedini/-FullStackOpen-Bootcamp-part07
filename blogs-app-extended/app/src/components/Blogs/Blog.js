import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBlogs,
  likeBlogs,
  selectBlogById,
  fetchBlogsComments
} from '../../features/blogs/blogsSlice'
import { selectUserLogged } from '../../features/users/userLoggedSlice'
import CommentList from '../Comments/CommentList'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => selectBlogById(state, id))
  const user = useSelector(selectUserLogged)

  useEffect(() => {
    dispatch(fetchBlogsComments(id))
  }, [])

  const incrementLikes = (blog) => dispatch(likeBlogs(blog))

  const deleteBlog = () => {
    if (window.confirm(`Remove ${blog.title}`)) {
      dispatch(deleteBlogs(id))
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <div>
          <a href="#">{blog.url}</a>
        </div>
        <div>
          <span>{`${blog.likes} likes`}</span><button onClick={() => incrementLikes(blog)}>like</button>
        </div>
        <div>
          <span>{`added by ${blog.author}`}</span>
          { blog.user.username === user.username && <div><button onClick={deleteBlog}>remove</button></div> }
        </div>
        <div>
          <CommentList comments={blog.comments}/>
        </div>
      </div>
    </div>
  )
}

export default Blog