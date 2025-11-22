import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import Note from './components/Note'
import ListOfNotes from './components/ListOfNotes';

function App() {
  const [formData, setFormData] = useState([]);

  // Wczytaj notatki z localStorage przy starcie
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('notes')) || [];
    const unique = saved.filter(
      (note, index, self) => index === self.findIndex(n => n.id === note.id)
    );
    setFormData(unique);
  }, [])

  // Funkcja dodająca notatkę
  const handleAddNote = (newNote) => {
    // Sprawdź, czy id już istnieje
    if (formData.some(note => note.id === newNote.id))
      return; // nie dodawaj duplikatu

    const updated = [...formData, newNote];
    setFormData(updated);
    localStorage.setItem('notes', JSON.stringify(updated));
  }

  return (
    <>
    <div className="app-container">
      <div className='notes-section'>
        <ListOfNotes data={formData} setFormData={setFormData}/>
      </div>
      <div className='form-section'>
        <Form onSubmitData={handleAddNote}/>
      </div>
    </div>
    </>
  )
}

export default App
