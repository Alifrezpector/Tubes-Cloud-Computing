const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'tubes-secret';

/**
 * REGISTER
 */
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Input tidak lengkap' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Username sudah terdaftar' });
        }
        res.status(201).json({ message: 'Register berhasil' });
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * LOGIN
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ message: 'User tidak ditemukan' });
      }

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ message: 'Password salah' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.json({ token });
    }
  );
});

app.listen(3001, () => {
  console.log('Auth Service running on port 3001');
});
