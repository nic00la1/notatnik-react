import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Note from './components/Note'

function App() {

  const [formData, setFormData] = useState({});

  return (
    <>
      <Form onSubmitData={setFormData}/>
      <Note data={formData}/>
    </>
  )
}

export default App
