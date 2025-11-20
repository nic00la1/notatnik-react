import '../styles/Form.css'
import React from 'react'

const Form = () => {

  // Paleta kolorów - funkcja
  function button () {
    const palette = document.querySelector('.palette');
    palette.classList.toggle('active');

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.classList[0];
            palette.className = 'palette ' + color;
        });
    });
  }

  // JSX
  return (
    <div>
        <form>
            <h1>Formularz dodawania notatki</h1>
            <p>Tytuł</p>
            <input type="text" name="title" />
            <p>Treść</p>
            <textarea name="content"></textarea>
            <p>Wybierz kolor notatki</p>
            <div className='colors-container'>
                <div className='orange button' onClick={button}></div>
                <div className='blue button' onClick={button}></div>
                <div className='red button' onClick={button}></div>
                <div className='green button' onClick={button}></div>
                <div className='yellow button' onClick={button}></div>
            </div>
            <div className='palette'></div>
            <button type="submit">Dodaj notatkę</button>
        </form>
    </div>
  )
}

export default Form
