import express from 'express';
import pool from '../database.js';

const router = express.Router();

// GET: ดึงข้อมูลห้องเรียนทั้งหมด
router.get('/', async (req, res) => {
  try {
    const classroom = await pool.query("SELECT * FROM classroom");
    res.json(classroom.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// GET: ดึงข้อมูลห้องเรียนเฉพาะ ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM classroom WHERE classroomid = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// POST: เพิ่มข้อมูลห้องเรียน
router.post('/', async (req, res) => {
  try {
    const { number, capacity, buildingid } = req.body;
    if (!number || !capacity || !buildingid) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const result = await pool.query(
      "INSERT INTO classroom (number, capacity, buildingid) VALUES ($1, $2, $3) RETURNING *",
      [number, capacity, buildingid]
    );
    res.status(201).json({ message: "Classroom created successfully", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteclassroom = await pool.query(
        "DELETE FROM classroom WHERE classroomid = $1",
        [id]
      );
      res.json("Classroom was deleted!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { number,capacity  } = req.body;
      await pool.query(
        "UPDATE classroom SET number=$1,capacity=$2 WHERE classroomid =$3 ",
        [ number,capacity,id ]
      );
      res.send("Classroom was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
export default router;