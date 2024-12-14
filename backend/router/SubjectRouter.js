import express from 'express';
import pool from '../database.js';

const router = express.Router();

// GET: ดึงข้อมูลวิชาทั้งหมด
router.get('/', async (req, res) => {
  try {
    const subject = await pool.query("SELECT * FROM subject");
    res.json(subject.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM subject WHERE subjectid = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// POST: เพิ่มข้อมูลวิชา
router.post('/', async (req, res) => {
  try {
    const { sname, scredit, sgradelevel, stype } = req.body;
    if (!sname || !scredit || !sgradelevel || !stype) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const result = await pool.query(
      "INSERT INTO subject (sname, scredit, sgradelevel, stype) VALUES ($1, $2, $3, $4) RETURNING *",
      [sname, scredit, sgradelevel, stype]
    );
    res.status(201).json({ message: "Subject created successfully", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletesubject = await pool.query(
        "DELETE FROM subject WHERE subjectid = $1",
        [id]
      );
      res.json("subject was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { sname,scredit,sgradelevel,stype  } = req.body;
      await pool.query(
        "UPDATE subject SET sname=$1,scredit=$2,sgradelevel=$3,stype=$4 WHERE subjectid =$5 ",
        [ sname,scredit,sgradelevel,stype,id ]
      );
      res.send("Student was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
export default router;