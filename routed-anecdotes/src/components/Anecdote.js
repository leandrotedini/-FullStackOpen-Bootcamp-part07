import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id)) 
  return (
    <div>
      <h1><strong>{anecdote.content}</strong></h1>
      <div>
        <p>has {anecdote.votes} votes</p>
        <p>for more information see <a href={anecdote.info}>{anecdote.info}</a></p>
      </div>
    </div>
  )
}

export default Anecdote