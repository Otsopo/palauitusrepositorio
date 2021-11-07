import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Title = props => <><h1>{props.value}</h1><p /></>

function getMostVotedAnecdote(votes){
  let maxVotes = Math.max(...Object.values(votes))
  for (const [key, value] of Object.entries(votes)) {
    if (value === maxVotes){
      return key
    }
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    Array(anecdotes.length)
      .fill(0)
      .reduce((acc, val, i) => ({ ...acc, [i]: 0 }), {})
  )

  let selectedMostVotes = getMostVotedAnecdote(votes)

  return (
    <div>
      <Title value="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={() => setVotes({ ...votes, [selected]: votes[selected] + 1 })} text="vote" />
      {/* Or this way if you want to use a copy:
      => {
        const copy = {...votes}
        copy[selected]+1
        setVotes(copy)
        }*/}
      <Button onClick={() => {
        setSelected(Math.floor(Math.random() * (anecdotes.length)))
      }
      } text="next anecdote" />

    <Title value="Anecdote with most votes" />
    <div>{anecdotes[selectedMostVotes]}</div>
    </div>
  )
}

export default App