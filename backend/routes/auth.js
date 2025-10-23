

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

router.post('/signup', async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const {rows} = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
        if(rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hash = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id', 
            [email.toLowerCase(), hash]
        );

        const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.status(201).json({ token, message: 'User registered successfully' });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });

    }
});

//post /api/auth/login
router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const {rows} = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
        if(rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.status(200).json({ token, message: 'Login successful' });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;