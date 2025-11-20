import '../styles/Note.css'

import React from 'react'

const Note = () => {
  return (
    <div className='note-box'>
        <div className='small-triangle'></div>
        <h2>Tytuł notatki</h2>
        <hr/>
        <p>Zawartość notatki</p>
        <button className='button-note'>Usuń notatkę</button>
    </div>
  )
}

export default Note
