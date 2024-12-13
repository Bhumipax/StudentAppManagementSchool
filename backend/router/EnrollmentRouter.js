import express from 'express';
import pool from '../database.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const enrollment = await pool.query("SELECT * FROM enrollment");
        res.json(enrollment.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.post('/', async (req, res) => {
    try {
        const { subjectid, studentid, semester, type, date } = req.body;

        
        if (!subjectid || !studentid || !semester || !type || !date) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newEnrollment = await pool.query(
            "INSERT INTO enrollment (subjectid, studentid, semester, type, date) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [subjectid, studentid, semester, type, date]
        );
        res.status(201).json(newEnrollment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure ID exists
        const enrollmentExists = await pool.query(
            "SELECT * FROM enrollment WHERE enrollmentid = $1",
            [id]
        );

        if (enrollmentExists.rows.length === 0) {
            return res.status(404).json({ error: "Enrollment not found" });
        }

        await pool.query("DELETE FROM enrollment WHERE enrollmentid = $1", [id]);
        res.json({ message: "Enrollment was deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


router.get('/:studentid', async (req, res) => {
    try {
        const { studentid } = req.params;

        const studentCourses = await pool.query(
            "SELECT courseid, semester, year, grade FROM enrollment WHERE studentid = $1",
            [studentid]
        );

        if (studentCourses.rows.length === 0) {
            return res.status(404).json({ error: "No courses found for this student" });
        }

        res.json(studentCourses.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;
