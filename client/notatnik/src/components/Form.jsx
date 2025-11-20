import '../styles/Form.css'
import React, { useState } from 'react'

const Form = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Paleta kolorów - funkcja
  function button () {
    const palette = document.querySelector('.palette');
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.classList[0];
            palette.className = 'palette ' + color;
        });
    });
  }

  // Formularz - przekazywanie danych
  function handleSubmit(e) {
    e.preventDefault(); // Zapobiega przeładowaniu strony

    const color = document.querySelector('.palette').classList[0];
    
    // Jeśli pola są puste, wyświetl alert
    if (!title || !content || !color) {
        alert('Proszę wypełnić wszystkie pola formularza.');
        return;
    }
   
    console.log('Tytuł:', title);
    console.log('Treść:', content);
    console.log('Kolor:', color);

    // Wyślij dane do komponentu Note

    // Resetowanie formularza po wysłaniu
    resetForm();
    }

  function resetForm () {
    const form = document.querySelector('form');
    form.reset();
    const palette = document.querySelector('.palette');
    palette.className = 'palette'; // Reset koloru
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Formularz dodawania notatki</h1>
            <p>Tytuł</p>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              name="title" 
            />
            <p>Treść</p>
            <textarea 
              value={content}
              name="content"
              onChange={e => setContent(e.target.value)}
              type="text">
            </textarea>
            <p>Wybierz kolor notatki</p>
            <div className='colors-container'>
                <div className='orange button' onClick={button}></div>
                <div className='blue button' onClick={button}></div>
                <div className='red button' onClick={button}></div>
                <div className='green button' onClick={button}></div>
                <div className='yellow button' onClick={button}></div>
            </div>
            <div className='palette'></div>
            <button>Dodaj notatkę</button>
        </form>
    </div>
  )
}

export default Form
