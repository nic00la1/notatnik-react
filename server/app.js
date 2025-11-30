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
    connection.query(
        `SELECT Id AS id, Tytul, Zawartosc, Kolor, DATE_FORMAT(Data, '%Y-%m-%d') AS Data  FROM notatki`, 
        (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    })
})

// Dodawanie jednej notatki 
app.post('/notatki', (req, res) => {
    const { Tytul, Zawartosc, Kolor, Data} = req.body;
    const sql = 'INSERT INTO notatki (Tytul, Zawartosc, Kolor, Data) VALUES (?, ?, ?, ?)';

    connection.query(sql, [Tytul, Zawartosc, Kolor, Data], (err, result) => {
            if(err) {
                return res.status(500).send(err);
            }

            // Pobiera nowo dodaną notatki
            connection.query(
                'SELECT Id AS id, Tytul, Zawartosc, Kolor, Data FROM notatki WHERE Id = ?',
                [result.insertId],
                (err2, rows) => {
                    if (err2) {
                        return res.status(500).send(err2);
                    }
                    res.json(rows[0]) // zwraca pełny obiekt notaki
                }
            );
        }
    )
})

// Usuwanie notatki
app.delete('/notatki/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM notatki WHERE Id = ?', [id], (err, result) => {
        if (err) {
            console.error("SQL error:", err);
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notatka nie istnieje' });
        }
        res.json({ message: 'Notatka usunięta!' });
    });
});

// Aktualizacja notatki po Id
app.put('/notatki/:id', (req, res) => {
    const { id } = req.params;
    const { Tytul, Zawartosc, Kolor, Data } = req.body;

    connection.query(
        'UPDATE notatki SET Tytul = ?, Zawartosc = ?, Kolor = ?, Data = ? WHERE Id = ?',
        [Tytul, Zawartosc, Kolor, Data, id],
        (err, result) => {
            if (err) {
                console.error("SQL error: ", err);
                return res.status(500).send(err);
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Notatka nie istnieje' });
            }
            res.json({ message: 'Notatka zaktualizowana!' });
        }
    );
})

// Nasłuchiwanie portu
app.listen(3001, () => {
    console.log("Server port: 3001");
})