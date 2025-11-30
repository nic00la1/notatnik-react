import '../styles/Form.css'
import { useState } from 'react';

const Form = ({onSubmitData, editNote, onUpdate}) => {
  // Jeśli edytujemy, ustawiamy wartości startowe z notatki
    const [formData, setFormData] = useState(() => ({
      title: editNote ? editNote.Tytul : '',
      content: editNote ? editNote.Zawartosc : '',
      color: editNote ? editNote.Kolor : '',
      date: editNote && editNote.Data ? editNote.Data.slice(0,10) : ''
  }));

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Zapobiega przeładowaniu strony

    const formDataObj = new FormData(e.target);

    // Konwersja FormData na obiekt
    const dataObject = Object.fromEntries(formDataObj.entries());

    const Tytul = dataObject.title;
    const Zawartosc = dataObject.content;
    const Kolor = formData.color;
    const Data =  editNote
      ? formData.date // zachowujemy datę z notatki przy edycji
      : new Date().toISOString().slice(0, 10); // bieżąca data przy dodawaniu
    
    // Jeśli pola są puste, wyświetl alert
    if (!Tytul || !Zawartosc || !Kolor) {
        alert('Proszę wypełnić wszystkie pola formularza.');
        return;
    }

    // Obiekt zgodny z backendem
    const newNote = { Tytul, Zawartosc, Kolor, Data }

    if (editNote) {
      // tryb edycji
      onUpdate(editNote.Id, newNote);
    } else {
      // tryb dodawania
      onSubmitData(newNote);
      resetForm(); // reset tylko przy dodawaniu
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
        {editNote ? "Zapisz zmiany" : "Dodaj notatkę"}
      </button>
    </form>
  </div>
  );
}
export default Form
