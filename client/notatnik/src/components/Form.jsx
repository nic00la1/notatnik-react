import '../styles/Form.css'

const Form = ({onSubmitData}) => {

  // Paleta kolorów - funkcja
  function button () {
    const palette = document.querySelector('.palette');
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.classList[0];
            palette.className = 'palette ' + color;
        });
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Zapobiega przeładowaniu strony

    const formData = new FormData(e.target);

    // Konwersja FormData na obiekt
    const dataObject = Object.fromEntries(formData.entries());



    const title = dataObject.title;
    const content = dataObject.content;
    const color = document.querySelector('.palette').classList[1];
    
    // Jeśli pola są puste, wyświetl alert
    if (!title || !content || !color) {
        alert('Proszę wypełnić wszystkie pola formularza.');
        return;
    }
   
    console.log('Tytuł:', title);
    console.log('Treść:', content);
    console.log('Kolor:', color);

    // Wyślij dane do komponentu Note
    onSubmitData({ title, content, color });
    
    // Resetowanie formularza po wysłaniu
    resetForm();
    }

  function resetForm () {
    const form = document.querySelector('form');
    form.reset();
    const palette = document.querySelector('.palette');
    palette.className = 'palette'; // Reset koloru
  }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Formularz dodawania notatki</h1>
            <p>Tytuł</p>
            <input type="text" name="title" placeholder='Wpisz tytuł notatki'/>
            <p>Treść</p>
            <textarea type="text" name="content"placeholder='Wpisz zawartość notatki'/>
            <p>Wybierz kolor notatki</p>
            <div className='colors-container'>
                <div className='orange button' onClick={button}></div>
                <div className='blue button' onClick={button}></div>
                <div className='red button' onClick={button}></div>
                <div className='green button' onClick={button}></div>
                <div className='yellow button' onClick={button}></div>
            </div>
            <div className='palette'></div>
            <button type='submit'>Dodaj notatkę</button>
        </form>
    </div>
  )
}

export default Form
