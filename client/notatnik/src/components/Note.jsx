import '../styles/Note.css'

const Note = ({item, data, setFormData}) => {

  let title = item.title;
  let content = item.content;
  const color = item.color;

  // Deafultowe własności title i content
  if (title === undefined) {
    title = "Brak tytułu";
  }
  if (content === undefined) {
    content = "Brak treści";
  }

  function handleDelete(item) {
    console.log("Delete button clicked", item);
    setFormData( data.filter((note) => note !== item));
  }

  return (
    
    <div className='note-box' style={{ backgroundColor: color }}>
        <div>
          <div className='small-triangle'></div>
          <h2>{title}</h2>
          <hr/>
          <p>{content}</p>
          <button className='button-note'
           onClick={() => handleDelete(item)}
           >Usuń notatkę</button>
        </div>
    </div>
  )
}

export default Note
