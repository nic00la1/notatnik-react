import '../styles/Note.css'

const Note = ({item, onDelete, onUpdate}) => {

  const title = item.Tytul || "Brak tytułu";
  const content = item.Zawartosc || "Brak treści";
  const color = item.Kolor || "#fff";
  const date = item.Data ? new Date(item.Data).toLocaleDateString('pl-PL') : "";

  return (
    
    <div className='note-box' style={{ backgroundColor: color }}>
        <div>
          <div className='small-triangle'></div>
          <p>{date}</p>
          <h2>{title}</h2>
          <hr/>
          <p>{content}</p>
          <button className='button-update-note'
           onClick={() => onUpdate(item.Id)}
           >Edytuj notatkę</button>
          <button className='button-delete-note'
           onClick={() => onDelete(item.Id)}
           >Usuń notatkę</button>
        </div>
    </div>
  )
}

export default Note
