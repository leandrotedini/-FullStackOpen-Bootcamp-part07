import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createBlogsComments } from '../../features/blogs/blogsSlice'
import { useField } from '../../hooks'

const CommentForm = () => {
  const blogId = useParams().id
  const dispatch = useDispatch()
  const { reset: resetComment, ...comment } = useField('text')

  const handleCreateComments = (event) => {
    event.preventDefault()

    const newComment = {
      text: comment.value,
      blog: blogId
    }

    try {
      dispatch(createBlogsComments(newComment))
      resetComment()
    } catch (exception) {
      console.log(exception)
    }
  }

  return <>
    <form onSubmit={handleCreateComments}>
      <input { ...comment } />
      <button>comment</button>
    </form>
  </>
}

export default CommentForm