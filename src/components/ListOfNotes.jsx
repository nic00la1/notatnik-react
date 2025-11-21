import '../styles/ListOfNotes.css'
import React from 'react'
import Note from './Note'

const ListOfNotes = ({data, setFormData}) => {
  return (
    <div className='list-of-notes'>
      {data.length === 0 ? (
        <div className='lack-of-notes'>
          <p className='p-lack-of-notes'>Brak notatek</p>
          <span>Dodaj nową notatkę</span>
        </div>
      ) : (
        data.map((item => (
            <Note key={item.id}
                  item={item} 
                  data={data} 
                  setFormData={setFormData}/>
        )))
      )}
    </div>
  )
}

export default ListOfNotes
