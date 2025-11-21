import '../styles/Note.css'

const Note = ({item, data, setFormData}) => {

  let title = item.title || "Brak tytułu";
  let content = item.content || "Brak treści";
  const color = item.color;

  function handleDelete(id) {
    console.log("Delete button clicked", id);
    const updated = data.filter((note) => note.id !== id);
    setFormData(updated);
    localStorage.setItem('notes', JSON.stringify(updated)); // Aktualizacja localStorage
  }

  return (
    
    <div className='note-box' style={{ backgroundColor: color }}>
        <div>
          <div className='small-triangle'></div>
          <h2>{title}</h2>
          <hr/>
          <p>{content}</p>
          <button className='button-note'
           onClick={() => handleDelete(item.id)}
           >Usuń notatkę</button>
        </div>
    </div>
  )
}

export default Note
