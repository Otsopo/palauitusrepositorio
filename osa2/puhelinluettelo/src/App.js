import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'

const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map(person =>
        <li key={person.id}>{person.name} {person.number}
          <button id={"delete_" + person.id} onClick={() => deletePerson(person)} >delete</button>
        </li>
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
    personService
      .getAll()
      .then(response => { setPersons(response) })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    if (persons.map((person) => person
      .name
      .toLowerCase())
      .includes(newName.toLowerCase())) {

      let personToUpdate = persons.filter(person => person.name.toLowerCase() == newName.toLocaleLowerCase())[0]

      if (window.confirm(`${personToUpdate.name} already exists in the phonebook, update the phone number?`))
        personService
          .update(personToUpdate.id, { name: newName, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.filter(item => item != personToUpdate).concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
    } else {

      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setNewSearch(event.target.value)
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      personService
        .deletePerson(person.id)
        .then(
          setPersons(persons.filter(item => item != person))
        )
  }

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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App