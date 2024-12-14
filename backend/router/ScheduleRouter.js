import express from 'express';
import pool from '../database.js';

const router = express.Router();

// GET: ดึงข้อมูลตารางสอนทั้งหมด
router.get('/', async (req, res) => {
  try {
    const schedule = await pool.query("SELECT * FROM schedule");
    res.json(schedule.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get('/:teacherid', async (req, res) => {
  try {
    const { teacherid } = req.params;
    const result = await pool.query("SELECT * FROM schedule WHERE teacherid = $1", [teacherid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No schedule found for this teacher" });
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query("SELECT * FROM schedule WHERE scheduleid = $1", [id]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Schedule not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// POST: เพิ่มตารางสอน
router.post('/', async (req, res) => {
  try {
    const { day, starttime, endtime, academicyear, semester, room, teacherid, subjectid } = req.body;

    // ตรวจสอบค่า teacherid
    if (!day || !starttime || !endtime || !academicyear || !semester || !room || !teacherid) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      "INSERT INTO schedule (day, starttime, endtime, academicyear, semester, room, teacherid, subjectid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [day, starttime, endtime, academicyear, semester, room, teacherid, subjectid]
    );

    res.status(201).json({ message: "Schedule created successfully", schedule: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
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
