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

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to Database!');
})

app.listen(3001, () => {
    console.log("Server port: 3001");
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})
