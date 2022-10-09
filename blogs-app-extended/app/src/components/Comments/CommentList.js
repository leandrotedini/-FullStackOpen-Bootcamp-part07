import React from 'react'
import CommentForm from './CommentForm'

const CommentList = ({ comments }) => {

  if (!comments) return <h2>No comments yet</h2>
  return (<>
    <ul>
      {comments.map( comment =>
        <li key={comment.id}>{comment.text}</li>
      )}
    </ul>
    <div>
      <CommentForm />
    </div>
  </>)
}

export default CommentList