import React from 'react'

const CommentList = ({ comments }) => {

  if (!comments) return <h2>No comments yet</h2>
  console.log('comment list',comments)
  return (<>
    <ul>
      {comments.map( comment =>
        <li key={comment.id}>{comment.text}</li>
      )}
    </ul>
  </>)
}

export default CommentList