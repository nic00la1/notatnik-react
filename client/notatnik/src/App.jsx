import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Note from './components/Note'
import ListOfNotes from './components/ListOfNotes';

function App() {
  const [formData, setFormData] = useState([]);

  return (
    <>
    <div className="app-container">
      <div className='notes-section'>
        <ListOfNotes data={formData} setFormData={setFormData}/>
      </div>
      <div className='form-section'>
        <Form onSubmitData={newNote => setFormData(prev => [...prev, newNote])}/>
      </div>
    </div>
    </>
  )
}

export default App
