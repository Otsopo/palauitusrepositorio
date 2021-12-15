import {useDispatch } from 'react-redux'
import {createAnecdoteAction} from '../reducers/anecdoteReducer'
import { createNotificationAction,zeroNotificationAction } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {

        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdoteAction(newAnecdote))
        dispatch(createNotificationAction("Added: " + content))
        setTimeout(() => { dispatch(zeroNotificationAction()) }, 5000)
    }
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">create</button>
        </form>
        </div>)
}

export default AnecdoteForm