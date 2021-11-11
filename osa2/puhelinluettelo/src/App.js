import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person =>
        <li key={person.id}>{person.name} {person.number}</li>
      )}
    </ul>)

}

const Search = ({ search, onChange }) => {
  return (<form onSubmit={(event) => event.preventDefault()}>
    <div>
      search:
      <input value={search} onChange={onChange} />
    </div>
  </form>)
}

const PersonForm = ({ addName, newName, newNumber, onChangeName, onChangeNumber }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:
        <input value={newName} onChange={onChangeName} />
      </div>
      <div>number: <input value={newNumber} onChange={onChangeNumber} /></div>
      <button type="submit">add</button>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    if (persons.map((person) => person
      .name
      .toLowerCase())
      .includes(newName.toLowerCase())) {

      alert(`${newName} is already added to phonebook`)
      return false
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setNewSearch(event.target.value)

  const personsToShow = search === '' ?
    persons :
    persons.filter(person => person
      .name
      .toLowerCase()
      .includes(search.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} onChange={handleSearchChange} />

      <h2>Add new</h2>
      <PersonForm addName={addName}
        newName={newName}
        newNumber={newNumber}
        onChangeNumber={handleNumberChange}
        onChangeName={handleNameChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App