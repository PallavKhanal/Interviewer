const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors({ origin: ["http://localhost:5176", "http://10.232.232.151:5176"] }));
app.use(express.json());

//Postgres connection setup
const pool = require('./db');

// Auth Routes
app.use('/api/auth', require('./routes/auth'));

// test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});