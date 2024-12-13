import express from 'express';
import pool from '../database.js'

const router = express.Router()

router.get('/',async(req,res) => {
    try{
        const studenttimetable =  await pool.query("SELECT * FROM studenttimetable")
        res.json(studenttimetable.rows)
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
        const { date,checkedtime,status,scheduleid,studentid } = req.body;
        await pool.query("INSERT INTO studenttimetable (date,checkedtime,status,scheduleid,studentid) VALUES($1,$2,$3,$4,$5) RETURNING *",[date,checkedtime,status,scheduleid,studentid] ) 
        res.send("Studenttimetable created successfully")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletestudenttimetable = await pool.query(
            "DELETE FROM studenttimetable WHERE studenttimetableid = $1",
            [id]
        );
        res.json("Studenttimetable was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { date,checkedtime,status,scheduleid,studentid } = req.body;
        await pool.query(
            "UPDATE studenttimetable SET date = $1,checkedtime = $2,status = $3,scheduleid = $4,studentid = $5 WHERE studenttimetableid = $6",
            [date,checkedtime,status,scheduleid,studentid,id]
        );
        res.send("Studenttimetable was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

export default router;