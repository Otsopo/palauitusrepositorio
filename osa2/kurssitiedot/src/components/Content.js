import React from "react"

const Part = (props) => {
    return (
        <>
            <p>
                {props.part} {props.exercises}
            </p>
        </>
    )
}

const Content = ({parts}) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </>
    )
}


export default Content