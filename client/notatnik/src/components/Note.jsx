import '../styles/Note.css'

import React from 'react'

const Note = ({data}) => {

  let title = data.title;
  let content = data.content;
  const color = data.color;

  // Deafultowe własności title i content
  if (title === undefined) {
    title = "Brak tytułu";
  }
  if (content === undefined) {
    content = "Brak treści";
  }

  return (
    <div className='note-box' style={{ backgroundColor: color }}>
        <div className='small-triangle'></div>
        <h2>{title}</h2>
        <hr/>
        <p>{content}</p>
        <button className='button-note'>Usuń notatkę</button>
    </div>
  )
}

export default Note
