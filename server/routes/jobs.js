const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM jobs ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a job
router.post('/', async (req, res) => {
  try {
    const { company, position, status, location, notes } = req.body;
    const result = await pool.query(
      'INSERT INTO jobs (company, position, status, location, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [company, position, status, location, notes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM jobs WHERE id = $1', [id]);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
