import express, { request } from 'express';
import pool from '../database.js'

const router = express.Router()

router.get('/',async(req,res) => {
    const subject =  await pool.query("SELECT * FROM subject")
    res.json(subject.rows)

})

router.post("/", async (req, res) => {
    try {
      const { subjectid,sname,scredit,sgradelevel,stype } = req.body;
      await pool.query("INSERT INTO subject (subjectid,sname,scredit,sgradelevel,stype) VALUES($1,$2,$3,$4,$5) RETURNING *"
        ,[ subjectid,sname,scredit,sgradelevel,stype] ) 
      res.send("Create succ full")
    } catch (err) {
      console.error(err.message);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletesubject = await pool.query(
        "DELETE FROM subject WHERE subjectid = $1",
        [id]
      );
      res.json("subject was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });




export default router;