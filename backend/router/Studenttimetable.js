import express from 'express';
import pool from '../database.js';

const router = express.Router();

// GET: ดึงข้อมูลทั้งหมด
router.get('/', async (req, res) => {
    try {
        const studenttimetable = await pool.query("SELECT * FROM studenttimetable");
        res.json(studenttimetable.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// GET: ดึงข้อมูลตาม ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const studenttimetable = await pool.query(
            "SELECT * FROM studenttimetable WHERE studenttimetableid = $1",
            [id]
        );

        if (studenttimetable.rows.length === 0) {
            return res.status(404).json({ error: "Student timetable not found" });
        }

        res.json(studenttimetable.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// POST: เพิ่มข้อมูลใหม่
router.post("/", async (req, res) => {
    try {
        const { date, checkedtime, status, scheduleid, studentid } = req.body;

        // ตรวจสอบข้อมูลก่อน
        if (!date || !checkedtime || !status || !scheduleid || !studentid) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newTimetable = await pool.query(
            "INSERT INTO studenttimetable (date, checkedtime, status, scheduleid, studentid) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [date, checkedtime, status, scheduleid, studentid]
        );

        res.status(201).json({ message: "Student timetable created successfully", timetable: newTimetable.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// DELETE: ลบข้อมูลตาม ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTimetable = await pool.query(
            "DELETE FROM studenttimetable WHERE studenttimetableid = $1 RETURNING *",
            [id]
        );

        if (deleteTimetable.rows.length === 0) {
            return res.status(404).json({ error: "Student timetable not found" });
        }

        res.json({ message: "Student timetable deleted successfully", timetable: deleteTimetable.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// PUT: อัปเดตข้อมูลตาม ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { date, checkedtime, status, scheduleid, studentid } = req.body;

        // ตรวจสอบข้อมูลก่อน
        if (!date || !checkedtime || !status || !scheduleid || !studentid) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const updateTimetable = await pool.query(
            "UPDATE studenttimetable SET date = $1, checkedtime = $2, status = $3, scheduleid = $4, studentid = $5 WHERE studenttimetableid = $6 RETURNING *",
            [date, checkedtime, status, scheduleid, studentid, id]
        );

        if (updateTimetable.rows.length === 0) {
            return res.status(404).json({ error: "Student timetable not found" });
        }

        res.json({ message: "Student timetable updated successfully", timetable: updateTimetable.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

export default router;
