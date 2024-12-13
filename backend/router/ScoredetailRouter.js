import express from 'express';
import pool from '../database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const scoredetail = await pool.query('SELECT * FROM scoredetail');
    res.json(scoredetail.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const scoredetail = await pool.query(
            'SELECT * FROM scoredetail WHERE scoredetailid = $1',
            [id]
        );

        if (scoredetail.rows.length === 0) {
            return res.status(404).json({ error: 'Scoredetail not found' });
        }

        res.json(scoredetail.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
  try {
    const { scorevalue, scoresemester, scoretype, subjectid, educationdataid } = req.body;
    if (!scorevalue || !scoresemester || !scoretype || !subjectid || !educationdataid) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newScoredetail = await pool.query(
      'INSERT INTO scoredetail (scorevalue, scoresemester, scoretype, subjectid, educationdataid) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [scorevalue, scoresemester, scoretype, subjectid, educationdataid]
    );
    res.status(201).json(newScoredetail.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { scorevalue, scoresemester, scoretype, subjectid, educationdataid } = req.body;
    if (!scorevalue || !scoresemester || !scoretype || !subjectid || !educationdataid) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const updatedScoredetail = await pool.query(
      'UPDATE scoredetail SET scorevalue = $1, scoresemester = $2, scoretype = $3, subjectid = $4, educationdataid = $5 WHERE scoredetailid = $6 RETURNING *',
      [scorevalue, scoresemester, scoretype, subjectid, educationdataid, id]
    );
    if (updatedScoredetail.rows.length === 0) {
      return res.status(404).json({ error: 'Scoredetail not found' });
    }
    res.json(updatedScoredetail.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedScoredetail = await pool.query(
      'DELETE FROM scoredetail WHERE scoredetailid = $1 RETURNING *',
      [id]
    );
    if (deletedScoredetail.rows.length === 0) {
      return res.status(404).json({ error: 'Scoredetail not found' });
    }
    res.json({ message: 'Scoredetail deleted successfully', data: deletedScoredetail.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
