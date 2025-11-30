import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import Note from './components/Note'
import ListOfNotes from './components/ListOfNotes';

function App() {
  const [notes, setNotes] = useState([]); 
  const [editNote, setEditNote] = useState(null);

  // Wczytaj notatki z backendu
 useEffect(() => {
  fetch('http://localhost:3001/notatki')
    .then(res => res.json())
    .then(data => {
      const normalised = data.map(note => ({
        ...note,
        Data: note.Data ? note.Data.slice(0, 10) : ""
      }));
      setNotes(normalised);
    })
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
    .then((data) => {
      setNotes(prev => [...prev, data])
    })
    .catch(err => console.error(err));
  };

  // Funkcja usuwająca 1 wybraną notatkę
  const handleDeleteNote = (id) => {
    fetch(`http://localhost:3001/notatki/${id}`, {
      method: 'DELETE'
    })
    .then(() => setNotes(prev => prev.filter(note => note.id !== id)))
    .catch(err => console.error(err));
  };

  const handleUpdateNote = (id, updatedNote) => {
  fetch(`http://localhost:3001/notatki/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedNote)
  })
  .then(res => res.json())
  .then(() => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, ...updatedNote} : note
      )
    );
    setEditNote(null); // zamyka tryb edycji po zapisaniu
  })
  .catch(err => console.error(err));
  };

  const handleEditClick = (note) => {
    setEditNote(note) // ustawia notatkę do edycji
  }

  return (
    <>
    <div className="app-container">
      <div className='notes-section'>
        <ListOfNotes 
          data={notes} 
          onDelete={handleDeleteNote}
          onUpdate={handleEditClick}/>
      </div>
      <div className='form-section'>
        <Form 
          onSubmitData={handleAddNote}
          editNote={editNote}
          onUpdate={handleUpdateNote}/>
      </div>
    </div>
    </>
  )
}

export default App
