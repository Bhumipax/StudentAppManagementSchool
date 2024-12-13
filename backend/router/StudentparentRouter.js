import express from 'express';
import pool from '../database.js'

const router = express.Router()

router.get('/',async(req,res) => {
    try{
        const studentparent =  await pool.query("SELECT * FROM studentparent")
        res.json(studentparent.rows)
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
        const { studentid,parentid } = req.body;
        await pool.query("INSERT INTO studentparent (studentid,parentid) VALUES($1,$2) RETURNING *",[studentid,parentid] ) 
        res.send("Studentparent created successfully")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletestudentparent = await pool.query(
            "DELETE FROM studentparent WHERE studentparentid = $1",
            [id]
        );
        res.json("Studentparent was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { studentid,parentid } = req.body;
        await pool.query(
            "UPDATE studentparent SET studentid = $1,parentid = $2 WHERE studentparentid = $3",
            [studentid,parentid,id]
        );
        res.send("Studentparent was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

export default router;