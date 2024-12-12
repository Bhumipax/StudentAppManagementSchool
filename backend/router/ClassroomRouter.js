import express, { request } from 'express';
import pool from '../database.js'

const router = express.Router()
router.get('/',async(req,res) => {
  try{
    const classroom =  await pool.query("SELECT * FROM classroom")
    res.json(classroom.rows)
  }catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
    try {
      const { number,capacity } = req.body;
      await pool.query("INSERT INTO classroom (number,capacity) VALUES($1,$2) RETURNING *",[number,capacity] ) 
      res.send("Classroom created successfully")
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteclassroom = await pool.query(
        "DELETE FROM classroom WHERE classroomid = $1",
        [id]
      );
      res.json("Classroom was deleted!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  




export default router;