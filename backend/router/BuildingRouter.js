import express from 'express';
import pool from '../database.js';

const router = express.Router();

// GET: ดึงข้อมูลอาคารทั้งหมด
router.get('/', async (req, res) => {
    try {
        const buildings = await pool.query("SELECT * FROM building");
        res.json(buildings.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM building WHERE buildingid = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Building not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// POST: เพิ่มข้อมูลอาคารใหม่
router.post("/", async (req, res) => {
    try {
        const { bname, bfloor } = req.body;

        if (!bname || !bfloor) {
            return res.status(400).json({ error: "Both bname and bfloor are required" });
        }

        const newBuilding = await pool.query(
            "INSERT INTO building (bname, bfloor) VALUES ($1, $2) RETURNING *",
            [bname, bfloor]
        );

        res.status(201).json({ message: "Building created successfully", building: newBuilding.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// DELETE: ลบข้อมูลอาคารตาม ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteBuilding = await pool.query(
            "DELETE FROM building WHERE buildingid = $1 RETURNING *",
            [id]
        );

        if (deleteBuilding.rows.length === 0) {
            return res.status(404).json({ error: "Building not found" });
        }

        res.json({ message: "Building deleted successfully", building: deleteBuilding.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// PUT: อัปเดตข้อมูลอาคารตาม ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { bname, bfloor } = req.body;

        if (!bname || !bfloor) {
            return res.status(400).json({ error: "Both bname and bfloor are required" });
        }

        const updateBuilding = await pool.query(
            "UPDATE building SET bname = $1, bfloor = $2 WHERE buildingid = $3 RETURNING *",
            [bname, bfloor, id]
        );

        if (updateBuilding.rows.length === 0) {
            return res.status(404).json({ error: "Building not found" });
        }

        res.json({ message: "Building updated successfully", building: updateBuilding.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

export default router;
