import express from 'express';
import pool from '../database.js';

const router = express.Router();

// GET: ดึงข้อมูลทั้งหมด
router.get('/', async (req, res) => {
    try {
        const students = await pool.query("SELECT * FROM student");
        res.json(students.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// GET: ดึงข้อมูลตาม ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await pool.query("SELECT * FROM student WHERE studentid = $1", [id]);

        if (student.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json(student.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// POST: เพิ่มข้อมูลใหม่
router.post('/', async (req, res) => {
    try {
        const { studentid, sfname, slname, sgender, sage, sphonenumber, saddress } = req.body;

        // Validation: ตรวจสอบข้อมูลก่อน
        if (!studentid || !sfname || !slname || !sgender || !sage || !sphonenumber || !saddress) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newStudent = await pool.query(
            "INSERT INTO student (studentid, sfname, slname, sgender, sage, sphonenumber, saddress) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [studentid, sfname, slname, sgender, sage, sphonenumber, saddress]
        );

        res.status(201).json(newStudent.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// DELETE: ลบข้อมูลตาม ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteStudent = await pool.query(
            "DELETE FROM student WHERE studentid = $1 RETURNING *",
            [id]
        );

        if (deleteStudent.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "Student deleted successfully", student: deleteStudent.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// PUT: อัปเดตข้อมูลตาม ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { sfname, slname, sgender, sage, sphonenumber, saddress } = req.body;

        // Validation: ตรวจสอบข้อมูลก่อน
        if (!sfname || !slname || !sgender || !sage || !sphonenumber || !saddress) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const updateStudent = await pool.query(
            "UPDATE student SET sfname = $1, slname = $2, sgender = $3, sage = $4, sphonenumber = $5, saddress = $6 WHERE studentid = $7 RETURNING *",
            [sfname, slname, sgender, sage, sphonenumber, saddress, id]
        );

        if (updateStudent.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "Student updated successfully", student: updateStudent.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

export default router;
