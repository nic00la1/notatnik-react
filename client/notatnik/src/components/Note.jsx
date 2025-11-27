import '../styles/Note.css'

const Note = ({item, onDelete}) => {

  const title = item.Tytul || "Brak tytułu";
  const content = item.Zawartosc || "Brak treści";
  const color = item.Kolor || "#fff";
  const date = item.data || "";

  return (
    
    <div className='note-box' style={{ backgroundColor: color }}>
        <div>
          <div className='small-triangle'></div>
          <p>{date}</p>
          <h2>{title}</h2>
          <hr/>
          <p>{content}</p>
          <button className='button-note'
           onClick={() => onDelete(item.Id)}
           >Usuń notatkę</button>
        </div>
    </div>
  )
}

export default Note
