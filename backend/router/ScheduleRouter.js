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
    const {  day, starttime, endtime , academicyear, semester, room} = req.body;
    await pool.query(
      "INSERT INTO schedule ( day, starttime, endtime , academicyear, semester, room) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [ day, starttime, endtime , academicyear, semester, room]
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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {  day, starttime, endtime , academicyear, semester, room  } = req.body;
    await pool.query(
      "UPDATE schedule SET day=$1,starttime=$2,endtime=$3,academicyear=$4,semester=$5,room=$6 WHERE scheduleid =$7 ",
      [  day, starttime, endtime , academicyear, semester, room,id ]
    );
    res.send("Schedule was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
