import '../styles/Note.css'

import React from 'react'

const Note = ({data}) => {

  const title = JSON.stringify(data, null, 2);
  const content = JSON.stringify(data, null, 2);

  return (
    <div className='note-box'>
        <div className='small-triangle'></div>
        <h2>{title}</h2>
        <hr/>
        <p>{content}</p>
        <button className='button-note'>Usuń notatkę</button>
    </div>
  )
}

export default Note
