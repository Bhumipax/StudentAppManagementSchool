import express from 'express';
import pool from '../database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const schedule = await pool.query("SELECT * FROM schedule");
    res.json(schedule.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { scheduleid, day, starttime, endtime , academeicyear, semester, room} = req.body;
    await pool.query(
      "INSERT INTO schedule (scheduleid, day, starttime, endtime , academeicyear, semester, room) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [scheduleid, day, starttime, endtime , academeicyear, semester, room]
    );
    res.send("Schedule created successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteschedule = await pool.query(
      "DELETE FROM schedule WHERE scheduleid = $1",
      [id]
    );
    res.json("Schedule was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
