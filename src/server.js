const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL config 
const pool = new Pool({
  user: 'postgres',        // your pg username
  host: 'localhost',
  database: 'mydb',        // your database name
  password: '2004', // replace with your password
  port: 5432,
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new user
app.post('/users', async (req, res) => {
  const { id, name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *',
      [id, name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE user by id or name
app.delete('/users/:identifier', async (req, res) => {
  const identifier = req.params.identifier;

  let query, values;

  if (!isNaN(identifier)) {
    // If numeric, treat as ID
    query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    values = [parseInt(identifier)];
  } else {
    // Otherwise, treat as name
    query = 'DELETE FROM users WHERE name = $1 RETURNING *';
    values = [identifier];
  }

  try {
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully', user: result.rows[0] });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/users`);
});
