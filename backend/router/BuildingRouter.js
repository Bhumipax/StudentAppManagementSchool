import express from 'express';
import pool from '../database.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const enrollment = await pool.query("SELECT * FROM Enrollment");
        res.json(enrollment.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Server Error" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { subjectid, studentid, semester, date } = req.body;

        if (!subjectid || !studentid || !semester || !date) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newEnrollment = await pool.query(
            "INSERT INTO Enrollment (SubjectID, StudentID, Semester, Date) VALUES ($1, $2, $3, $4) RETURNING *",
            [subjectid, studentid, semester, date]
        );
        res.status(201).json(newEnrollment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const enrollment = await pool.query(
            "SELECT * FROM Enrollment WHERE EnrollmentID = $1",
            [id]
        );

        if (enrollment.rows.length === 0) {
            return res.status(404).json({ error: "Enrollment not found" });
        }

        res.json(enrollment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Server Error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { subjectid, studentid, semester, date } = req.body;

        const updateEnrollment = await pool.query(
            "UPDATE Enrollment SET SubjectID = $1, StudentID = $2, Semester = $3, Date = $4 WHERE EnrollmentID = $5 RETURNING *",
            [subjectid, studentid, semester, date, id]
        );

        if (updateEnrollment.rows.length === 0) {
            return res.status(404).json({ error: "Enrollment not found" });
        }

        res.json(updateEnrollment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Server Error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteEnrollment = await pool.query(
            "DELETE FROM Enrollment WHERE EnrollmentID = $1 RETURNING *",
            [id]
        );

        if (deleteEnrollment.rows.length === 0) {
            return res.status(404).json({ error: "Enrollment not found" });
        }

        res.json({ message: "Enrollment deleted successfully", enrollment: deleteEnrollment.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Server Error" });
    }
});

export default router;
