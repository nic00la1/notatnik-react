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

  // Funkcja dodająca notatkę (unikalna logika w jednym miejscu)
  const handleAddNote = (newNote) => {
    // sprawdź czy id już istnieje
    if (formData.some(note => note.id === newNote.id))
      return; // nie dodawaj duplikatu

    const updated = [...formData, newNote];
    setFormData(updated);
    localStorage.setItem('notes', JSON.stringify(updated));
  }

  return (
    <>
    <div className="box">
      <ListOfNotes data={formData} setFormData={setFormData}/>
      <Form onSubmitData={handleAddNote}/>
    </div>
    </>
  )
}

export default App
