const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteAnecdoteAction = (id) => ({
  type: 'VOTE',
  data: {
    id
  }
})

export const initializeAnecdotes = (dotes) => {
  return {
    type: 'INIT_DOTES',
    data: dotes,
  }
}

export const createAnecdoteAction = (data) => ({
  type: 'NEW_DOTE',
  data
})

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  if (action.type === 'VOTE') {
    let data = action.data
    let other_dotes = state.filter(dootti => dootti.id !== data.id)
    let voted_dote = state.filter(dootti => dootti.id === data.id)[0]
    let new_dotes = other_dotes.concat({ ...voted_dote, votes: voted_dote.votes + 1 })

    return new_dotes
  } else if (action.type === "NEW_DOTE") {
    let data = action.data
    return [...state, { ...data }]
  } else if (action.type === 'INIT_DOTES')
    return action.data

  return state
}

export default anecdoteReducer