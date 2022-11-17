import { useState, useEffect } from 'react'
import Form from './Components/Form'
import People from './Components/People'
import axios from 'axios'
import peopleService from './services/peoples'
import peoples from './services/peoples'



//states:
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setNewFilter] = useState ('')

//data:

const hook = () => {
  peopleService.getAll()
  .then(initial => {
    setPersons(initial)
  })
}
useEffect(hook, [])

//handlechanges:
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumChange = (e) => {
    setNewNum(e.target.value)
  }
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
    
  }

  const handleDel = (id) => {
    const n = persons.find(person => person.id===id).name
    if(window.confirm(`Delete ${n}?`)){
    peopleService.del(id)
    setPersons(persons.filter(person => person.id !== id))
  }
  }


  
  const addPerson = (e) => {
    e.preventDefault();
    
    const duplicate = persons.find(person => newName === person.name) //find if there already exists same name
    if(duplicate != undefined){
      if(!window.confirm(`${duplicate.name} is already in the phonebook, replace it?`)){ //if click cancel, do nothing
        setNewName('')
        setNewNum('')
        return
      }
      const newPerson = {
        name: newName, 
        number: newNum, 
        id: duplicate.id,
      }
      peopleService.update(duplicate.id, newPerson) //updating backend then updating state with .map
      setPersons(persons.map(person => 
        person.id === duplicate.id ? newPerson : person
      ))
      setNewName('')
      setNewNum('')
    }
    else{
      const newPerson = {
        name: newName, 
        number: newNum, 
        id: persons[persons.length-1].id+1,
      }
      
      peopleService.create(newPerson)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNum('')
      })
    }
    
    
    
    
  }

  const show = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <input value = {filter} 
        onChange={handleFilterChange} />
      <h2>Add a new</h2>
        <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
         newNum={newNum} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
        <People show={show} handleDel={handleDel}/>
    </div>
  )
}

export default App