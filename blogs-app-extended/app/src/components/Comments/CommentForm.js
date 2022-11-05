import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createBlogsComments } from '../../features/blogs/blogsSlice'
import { useField } from '../../hooks'
import {
  Input,
  HStack,
  Button
} from '@chakra-ui/react'

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
      <HStack>
        <Input { ...comment } size="sm"/>
        <Button type='submmit' size="sm">Comment</Button>
      </HStack>
    </form>
  </>
}

export default CommentForm