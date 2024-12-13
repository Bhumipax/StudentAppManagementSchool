import express, { request } from 'express';
import pool from '../database.js'

const router = express.Router()

router.get('/',async(req,res) => {
    const subject =  await pool.query("SELECT * FROM subject")
    res.json(subject.rows)

})

router.post("/", async (req, res) => {
    try {
      const { sname,scredit,sgradelevel,stype } = req.body;
      await pool.query("INSERT INTO subject (sname,scredit,sgradelevel,stype) VALUES($1,$2,$3,$4) RETURNING *"
        ,[ sname,scredit,sgradelevel,stype] ) 
      res.send("Subject created successfully")
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

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { sname,scredit,sgradelevel,stype  } = req.body;
      await pool.query(
        "UPDATE subject SET sname=$1,scredit=$2,sgradelevel=$3,stype=$4 WHERE subjectid =$5 ",
        [ sname,scredit,sgradelevel,stype,id ]
      );
      res.send("Student was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
export default router;