import { useEffect } from 'react';
import '../styles/Form.css'
import { useState } from 'react';

const Form = ({ onSubmitData, editNote, onUpdate }) => {
    const [formData, setFormData] = useState({
      title: '',
      content: '',
      color: '',
      date: ''
  });

  // Aktualizacja pól formularzam gdy zmienia się editNote
  useEffect(() => {
    if (editNote) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: editNote.Tytul || '',
        content: editNote.Zawartosc || '',
        color: editNote.Kolor || '',
        date: editNote.Data ? editNote.Data.slice(0, 10) : ''
      });
    }
  }, [editNote])

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Zapobiega przeładowaniu strony

    const { title, content, color, date } = formData;

    // Jeśli pola są puste, wyświetl alert
    if (!title || !content || !color) {
        alert('Proszę wypełnić wszystkie pola formularza.');
        return;
    }

    const localDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Obiekt zgodny z backendem
    const newNote = { 
      Tytul : title,
      Zawartosc : content,
      Kolor : color,
      Data:  date || localDate
    }

    if (editNote) {
      // tryb edycji
      onUpdate(editNote.id, newNote);
      resetForm();
    } else {
      // tryb dodawania
      onSubmitData(newNote);
      resetForm();
    }  
  };

  function resetForm () {
    const form = document.querySelector('form');
    form.reset();
    const palette = document.querySelector('.palette');
    palette.className = 'palette'; // Reset koloru
    setFormData({ title: '', content: '', color: '', date: '' });
  }


  return (
  <div>
    <form onSubmit={handleSubmit}>
      <h1>{editNote ? "Edytuj notatkę" : "Formularz dodawania notatki"}</h1>
      
      <p>Tytuł</p>
      <input 
        type="text" 
        name="title" 
        placeholder="Wpisz tytuł notatki"
        value={formData.title}
        onChange={handleChange}
      />

      <p>Treść</p>
      <textarea 
        name="content"
        placeholder="Wpisz zawartość notatki"
        value={formData.content}
        onChange={handleChange}
      />

      <p>Wybierz kolor notatki</p>
      <div className='colors-container'>
        {['orange', 'blue', 'red', 'green', 'yellow'].map((c) => {
          return (
          <div 
            key={c}
            className={`button ${c} ${formData.color === c ? 'selected' : ''}`}
            onClick={() => setFormData({ ...formData, color: c })}
            ></div>
          );
        })}
      </div>

        {/* Podgląd wybranego koloru */}
        <div
          className="palette"
          style={{ backgroundColor: `var(--${formData.color})` }}
        ></div>

      <button type="submit">
        {editNote ? "Zapisz zeedytowane zmiany" : "Dodaj notatkę"}
      </button>
    </form>
  </div>
  );
}
export default Form
