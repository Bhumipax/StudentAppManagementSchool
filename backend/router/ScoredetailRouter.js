import express from 'express';
import pool from '../database.js'

const router = express.Router()

router.get('/',async(req,res) => {
    try{
        const scoredetail =  await pool.query("SELECT * FROM scoredetail")
        res.json(scoredetail.rows)
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
        const { scorevalue,scoresemester,scoretype,subjectid,educationdataid } = req.body;
        await pool.query("INSERT INTO scoredetail (scorevalue,scoresemester,scoretype,subjectid,educationdataid) VALUES($1,$2,$3,$4,$5) RETURNING *",[scorevalue,scoresemester,scoretype,subjectid,educationdataid] ) 
        res.send("Scoredetail created successfully")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletescoredetail = await pool.query(
            "DELETE FROM scoredetail WHERE scoredetailid = $1",
            [id]
        );
        res.json("Scoredetail was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { scorevalue,scoresemester,scoretype,subjectid,educationdataid } = req.body;
        await pool.query(
            "UPDATE scoredetail SET scorevalue = $1,scoresemester = $2,scoretype = $3,subjectid = $4,educationdataid = $5 WHERE scoredetailid = $6",
            [scorevalue,scoresemester,scoretype,subjectid,educationdataid,id]
        );
        res.send("Scoredetail was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

export default router;