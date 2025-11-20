const Form = () => {
  return (
    <div>
        <form>
            <h1>Formularz dodawania notatki</h1>
            <p>Tytuł</p>
            <input type="text" name="title" />
            <p>Treść</p>
            <textarea name="content"></textarea>
            <button type="submit">Dodaj notatkę</button>
        </form>
    </div>
  )
}

export default Form
