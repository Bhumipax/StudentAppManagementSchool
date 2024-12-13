import express from 'express';
import pool from '../database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const parent = await pool.query('SELECT * FROM parent');
    res.json(parent.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const parent = await pool.query(
            'SELECT * FROM parent WHERE parentid = $1',
            [id]
        );

        if (parent.rows.length === 0) {
            return res.status(404).json({ error: 'Parent not found' });
        }

        res.json(parent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});


router.post('/', async (req, res) => {
  try {
    const { pfname, plname, pphonenumber, paddress, prelationtostudent } = req.body;
    if (!pfname || !plname || !pphonenumber || !paddress || !prelationtostudent) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newParent = await pool.query(
      'INSERT INTO parent (pfname, plname, pphonenumber, paddress, prelationtostudent) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [pfname, plname, pphonenumber, paddress, prelationtostudent]
    );
    res.status(201).json(newParent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { pfname, plname, pphonenumber, paddress, prelationtostudent } = req.body;
    if (!pfname || !plname || !pphonenumber || !paddress || !prelationtostudent) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const updatedParent = await pool.query(
      'UPDATE parent SET pfname = $1, plname = $2, pphonenumber = $3, paddress = $4, prelationtostudent = $5 WHERE parentid = $6 RETURNING *',
      [pfname, plname, pphonenumber, paddress, prelationtostudent, id]
    );
    if (updatedParent.rows.length === 0) {
      return res.status(404).json({ error: 'Parent not found' });
    }
    res.json(updatedParent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedParent = await pool.query(
      'DELETE FROM parent WHERE parentid = $1 RETURNING *',
      [id]
    );
    if (deletedParent.rows.length === 0) {
      return res.status(404).json({ error: 'Parent not found' });
    }
    res.json({ message: 'Parent deleted successfully', data: deletedParent.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
