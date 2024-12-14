import express from 'express';
import pool from '../database.js';

const router = express.Router();

// GET: ดึงข้อมูลทั้งหมด
router.get('/', async (req, res) => {
    try {
        const studentparent = await pool.query("SELECT * FROM studentparent");
        res.json(studentparent.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// GET: ดึงข้อมูลตาม ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const studentparent = await pool.query(
            "SELECT * FROM studentparent WHERE studentparentid = $1",
            [id]
        );

        if (studentparent.rows.length === 0) {
            return res.status(404).json({ error: "Studentparent not found" });
        }

        res.json(studentparent.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// POST: เพิ่มข้อมูลใหม่
router.post("/", async (req, res) => {
    try {
        const { studentid, parentid } = req.body;

        // ตรวจสอบข้อมูลก่อน
        if (!studentid || !parentid) {
            return res.status(400).json({ error: "Both studentid and parentid are required" });
        }

        const newStudentParent = await pool.query(
            "INSERT INTO studentparent (studentid, parentid) VALUES($1, $2) RETURNING *",
            [studentid, parentid]
        );

        res.status(201).json({ message: "Studentparent created successfully", data: newStudentParent.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// DELETE: ลบข้อมูลตาม ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteStudentParent = await pool.query(
            "DELETE FROM studentparent WHERE studentparentid = $1 RETURNING *",
            [id]
        );

        if (deleteStudentParent.rows.length === 0) {
            return res.status(404).json({ error: "Studentparent not found" });
        }

        res.json({ message: "Studentparent deleted successfully", data: deleteStudentParent.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// PUT: อัปเดตข้อมูลตาม ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { studentid, parentid } = req.body;

        // ตรวจสอบข้อมูลก่อน
        if (!studentid || !parentid) {
            return res.status(400).json({ error: "Both studentid and parentid are required" });
        }

        const updateStudentParent = await pool.query(
            "UPDATE studentparent SET studentid = $1, parentid = $2 WHERE studentparentid = $3 RETURNING *",
            [studentid, parentid, id]
        );

        if (updateStudentParent.rows.length === 0) {
            return res.status(404).json({ error: "Studentparent not found" });
        }

        res.json({ message: "Studentparent updated successfully", data: updateStudentParent.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

export default router;
