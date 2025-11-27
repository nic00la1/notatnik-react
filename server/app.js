const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notatnik'
});

// Łączenie się z bazą danych
connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to Database!');
})

// Pobieranie wszystkich notatek
app.get('/notatki', (req, res) => {
    connection.query('SELECT * FROM notatki', (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    })
})

// Dodawanie jednej notatki
app.post('/notatki', (req, res) => {
    const { Tytul, Zawartosc, Kolor, Data} = req.body;
    connection.query(
        'INSERT INTO notatki (Tytul, Zawartosc, Kolor, Data) VALUES (?, ?, ?, ?)',
        [Tytul, Zawartosc, Kolor, Data],
        (err, result) => {
            if(err) {
                return res.status(500).send(err);
            }
            res.json({ message: 'Notatka dodana!', id: result.insertId });
        }
    )
})

// Usuwanie notatki
app.delete('notatki/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM notatki WHERE Id = ?', [id], (err, result) => {
        if(err) return res.status(500).send(err);
        res.json({ message: 'Notatka usunięta!' });
    });
})

// Nasłuchiwanie portu
app.listen(3001, () => {
    console.log("Server port: 3001");
})