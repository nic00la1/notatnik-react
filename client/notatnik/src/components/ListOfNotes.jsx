import "../styles/ListOfNotes.css"
import React from 'react'
import Note from './Note'

const ListOfNotes = ({data, onDelete, onUpdate}) => {
  return (
    <div className='list-of-notes'>
      {
        data.length === 0 ? (
          <div className="lack-of-notes">
            <p className="p-lack-of-notes">Brak Notatek</p>
            <span>Dodaj nową notatkę</span>
          </div>
        ) : (
        data.map((item => (
            <Note key={item.Id}
                  item={item} 
                  data={data} 
                  onDelete={onDelete}
                  onUpdate={onUpdate}/>
        )))
      )}
    </div>
  )
}

export default ListOfNotes
