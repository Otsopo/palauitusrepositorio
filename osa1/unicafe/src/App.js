import React, { useState } from 'react'

const StatisticLine = props =>
  <>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  </>
  
const Title = props => <><h1>{props.value}</h1><p /></>


const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistics = ({ good, neutral, bad, average, positive }) => {

  return (good === 0 & neutral === 0 & bad === 0) ?
    (<div>No feedback given</div>) :
    (<>
      <table>
        <tbody>
          {/* Using variable names as strings is a huge no-no, but I still wanted to try if it works in JS :) */}
          <StatisticLine value={good} text={varToString({ good })} />
          <StatisticLine value={neutral} text={varToString({ neutral })} />
          <StatisticLine value={bad} text={varToString({ bad })} />
          <StatisticLine value={bad + neutral + good} text={"all"} />
          <StatisticLine value={average} text={varToString({ average })} />
          <StatisticLine value={positive+"%"} text={varToString({ positive })} />
        </tbody>
      </table>
    </>)
}
const varToString = varObj => Object.keys(varObj)[0]

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const average = (good - bad) / (good + neutral + bad)
  const positive = good / (good + bad + neutral) * 100


  return (
    <div>
      <Title value="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Title value="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} />
    </div>
  )
}

export default App