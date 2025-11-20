import "../styles/ListOfNotes.css"
import React from 'react'
import Note from './Note'

const ListOfNotes = ({data, setFormData}) => {
  return (
    <div className='list-of-notes'>
      {
        data.map((item => (
            <Note key={item.id}
                  item={item} 
                  data={data} 
                  setFormData={setFormData}/>
        )))
      }
    </div>
  )
}

export default ListOfNotes
