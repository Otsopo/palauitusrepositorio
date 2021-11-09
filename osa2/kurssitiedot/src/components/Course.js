import React from 'react'
import Content from './Content'

const Header = (props) => {
  return (
    <>
      <h2 key={props.id}>{props.course}</h2>
    </>
  )
}

const Total = ({ parts }) => {
  parts = parts.reduce((total, part) => total.concat(part), [])
  return (
    <>
      <b>total of exercises {parts.reduce((total, part) => total + part.exercises, 0)}</b>
    </>
  )
}

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) =>
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>)}


    </>
  )
}

export default Course