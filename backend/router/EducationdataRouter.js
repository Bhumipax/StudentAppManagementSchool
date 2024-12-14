import express from 'express';
import pool from '../database.js';


const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const educationdata = await pool.query('SELECT * FROM educationdata');
    res.json(educationdata.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});


router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params; // รับค่า id จาก URL
      const educationdata = await pool.query(
        'SELECT * FROM educationdata WHERE studentid = $1',
        [id]
      );
  
      if (educationdata.rows.length === 0) {
        return res.status(404).json({ error: 'Educationdata not found' });
      }
  
      res.json(educationdata.rows[0]); // ส่งกลับเฉพาะข้อมูลที่เจอ
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  
router.post('/', async (req, res) => {
  try {
    const { academicyear, gpa, semester, totalcredit, passedcredit, studentid } = req.body;
    if (!academicyear || !gpa || !semester || !totalcredit || !passedcredit || !studentid) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newEducationData = await pool.query(
      'INSERT INTO educationdata (academicyear, gpa, semester, totalcredit, passedcredit, studentid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [academicyear, gpa, semester, totalcredit, passedcredit, studentid]
    );
    res.status(201).json(newEducationData.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { academicyear, gpa, semester, totalcredit, passedcredit } = req.body;
    if (!academicyear || !gpa || !semester || !totalcredit || !passedcredit) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const updatedEducationData = await pool.query(
      'UPDATE educationdata SET academicyear = $1, gpa = $2, semester = $3, totalcredit = $4, passedcredit = $5 WHERE educationdataid = $6 RETURNING *',
      [academicyear, gpa, semester, totalcredit, passedcredit, id]
    );
    if (updatedEducationData.rows.length === 0) {
      return res.status(404).json({ error: 'Educationdata not found' });
    }
    res.json(updatedEducationData.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEducationData = await pool.query(
      'DELETE FROM educationdata WHERE educationdataid = $1 RETURNING *',
      [id]
    );
    if (deletedEducationData.rows.length === 0) {
      return res.status(404).json({ error: 'Educationdata not found' });
    }
    res.json({ message: 'Educationdata deleted successfully', data: deletedEducationData.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
