
import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdoteAction} from '../reducers/anecdoteReducer'
import { createNotificationAction,zeroNotificationAction } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const state = useSelector(state => state)
    const anecdotes = state.anecdotes
    const filter = state.filter

    const dispatch = useDispatch()
  
    const vote = (id,content) => {
      console.log('vote', id)
      dispatch(voteAnecdoteAction(id))
      dispatch(createNotificationAction("Voted for: " + content))
      setTimeout(() => { dispatch(zeroNotificationAction()) }, 5000)

    }
    const anecdotesToShow = filter === '' ?
    anecdotes :
    anecdotes.filter(anecdote => anecdote
      .content
      .toLowerCase()
      .includes(filter.toLowerCase())
    )
    return (<div>
        {anecdotesToShow.sort(function (a, b) {
            return b.votes - a.votes
          }).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
              </div>
            </div>
          )}
          </div>)
}

export default AnecdoteList