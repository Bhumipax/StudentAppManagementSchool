import express from 'express';
import pool from '../database.js';


const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const enrollments = await pool.query("SELECT * FROM enrollment");
        res.json(enrollments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; // รับค่า id จาก URL
        const enrollment = await pool.query(
            'SELECT * FROM enrollment WHERE enrollmentid = $1',
            [id]
        );

        if (enrollment.rows.length === 0) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }

        res.json(enrollment.rows[0]); // ส่งกลับเฉพาะข้อมูลที่เจอ
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});


router.post('/', async (req, res) => {
    try {
        const { subjectid, studentid, semester, date } = req.body;

        // Validate input
        if (!subjectid || !studentid || !semester || !date) {
            return res.status(400).json({ error: "All fields (subjectid, studentid, semester, date) are required" });
        }

        const newEnrollment = await pool.query(
            "INSERT INTO enrollment (subjectid, studentid, semester, date) VALUES ($1, $2, $3, $4) RETURNING *",
            [subjectid, studentid, semester, date]
        );
        res.status(201).json({ message: "Enrollment created successfully", data: newEnrollment.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if enrollment exists
        const enrollmentExists = await pool.query("SELECT * FROM enrollment WHERE enrollmentid = $1", [id]);
        if (enrollmentExists.rows.length === 0) {
            return res.status(404).json({ error: "Enrollment not found" });
        }

        await pool.query("DELETE FROM enrollment WHERE enrollmentid = $1", [id]);
        res.json({ message: "Enrollment deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});


router.get('/:studentid', async (req, res) => {
    try {
        const { studentid } = req.params;

        const studentCourses = await pool.query(
            "SELECT * FROM enrollment WHERE studentid = $1",
            [studentid]
        );

        if (studentCourses.rows.length === 0) {
            return res.status(404).json({ error: "No enrollments found for this student" });
        }

        res.json(studentCourses.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { subjectid, studentid, semester, date } = req.body;

        // Validate input
        if (!subjectid || !studentid || !semester || !date) {
            return res.status(400).json({ error: "All fields (subjectid, studentid, semester, date) are required" });
        }

        const updateEnrollment = await pool.query(
            "UPDATE enrollment SET subjectid = $1, studentid = $2, semester = $3, date = $4 WHERE enrollmentid = $5 RETURNING *",
            [subjectid, studentid, semester, date, id]
        );

        if (updateEnrollment.rows.length === 0) {
            return res.status(404).json({ error: "Enrollment not found" });
        }

        res.json({ message: "Enrollment updated successfully", data: updateEnrollment.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

export default router;
