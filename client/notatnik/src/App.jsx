import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import Note from './components/Note'
import ListOfNotes from './components/ListOfNotes';

function App() {
  const [formData, setFormData] = useState([]);

  // Wczytaj notatki z backendu
  useEffect(() => {
  fetch('http://localhost:3001/notatki')
    .then(res => res.json())
    .then(data => setFormData(data))
    .catch(err => console.error(err));
  }, []);

  // Funkcja dodająca notatkę
  const handleAddNote = (newNote) => {
    fetch('http://localhost:3001/notatki', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newNote) // {Tytul, Zawartosc, Kolor, Data}
    })
    .then(res => res.json())
    .then((res) => {
      setFormData(prev => [...prev, {Id: res.id, ...newNote}]);
    })
    .catch(err => console.error(err));
  };

  // Funkcja usuwająca 1 wybraną notatkę
  const handleDeleteNote = (id) => {
    fetch(`http://localhost:3001/notatki/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setFormData(prev => prev.filter(note => note.Id !== id));
    })
    .catch(err => console.error(err));
  };

  const handleUpdateNote = (id, updatedNote) => {
  fetch(`http://localhost:3001/notatki/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedNote)
  })
  .then(res => {
    if (!res.ok) throw new Error("Błąd aktualizacji");
    return res.json();
  })
  .then(() => {
    setFormData(prev =>
      prev.map(note => note.Id === id ? { ...note, ...updatedNote } : note)
    );
  })
  .catch(err => console.error(err));
};


  return (
    <>
    <div className="app-container">
      <div className='notes-section'>
        <ListOfNotes data={formData} 
        setFormData={setFormData} 
        onDelete={handleDeleteNote}
        onUpdate={handleUpdateNote}/>
      </div>
      <div className='form-section'>
        <Form onSubmitData={handleAddNote}/>
      </div>
    </div>
    </>
  )
}

export default App
