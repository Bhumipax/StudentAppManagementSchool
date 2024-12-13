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
      const { number,capacity,buildingid } = req.body;
      await pool.query("INSERT INTO classroom (number,capacity,buildingid) VALUES($1,$2,$3) RETURNING *",[number,capacity,buildingid] ) 
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

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { number,capacity  } = req.body;
      await pool.query(
        "UPDATE classroom SET number=$1,capacity=$2 WHERE classroomid =$3 ",
        [ number,capacity,id ]
      );
      res.send("Classroom was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
export default router;