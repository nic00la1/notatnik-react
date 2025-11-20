import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Note from './components/Note'
import ListOfNotes from './components/ListOfNotes';

function App() {
  const [formData, setFormData] = useState([]);

  return (
    <>
    <div className="box">
      <ListOfNotes data={formData} setFormData={setFormData}/>
      <Form onSubmitData={newNote => setFormData(prev => [...prev, newNote])}/>
    </div>
    </>
  )
}

export default App
