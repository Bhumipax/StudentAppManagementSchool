import express from 'express';
import pool from '../database.js'

const router = express.Router()

router.get('/',async(req,res) => {
    try{
        const parent =  await pool.query("SELECT * FROM parent")
        res.json(parent.rows)
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
        const { pfname,plname,pphonenumber,paddress,prelationtostudent } = req.body;
        await pool.query("INSERT INTO parent (pfname,plname,pphonenumber,paddress,prelationtostudent) VALUES($1,$2,$3,$4,$5) RETURNING *",[pfname,plname,pphonenumber,paddress,prelationtostudent] ) 
        res.send("Parent created successfully")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteparent = await pool.query(
            "DELETE FROM parent WHERE parentid = $1",
            [id]
        );
        res.json("Parent was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { pfname,plname,pphonenumber,paddress,prelationtostudent } = req.body;
        await pool.query(
            "UPDATE parent SET pfname = $1,plname = $2,pphonenumber = $3,paddress = $4,prelationtostudent = $5 WHERE parentid = $6",
            [pfname,plname,pphonenumber,paddress,prelationtostudent,id]
        );
        res.send("Parent was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

export default router;