import '../styles/Form.css'
import React from 'react'

const Form = () => {
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
                <div className='orange button'></div>
                <div className='blue button'></div>
                <div className='red button'></div>
                <div className='green button'></div>
                <div className='yellow button'></div>
            </div>
            <div className='palette'></div>
            <button type="submit">Dodaj notatkę</button>
        </form>
    </div>
  )
}

export default Form
