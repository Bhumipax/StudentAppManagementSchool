import express, { request } from 'express';
import pool from './database.js'

const router = express.Router()

router.get('/',async(req,res) => {
  try {
    const building =  await pool.query("SELECT * FROM building")
    res.json(building.rows)
  }catch(err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
    try {
      const { bname,bfloor } = req.body;
      await pool.query("INSERT INTO building (bname,bfloor) VALUES($1,$2) RETURNING *",[bname,bfloor] ) 
      res.send("Building created successfully")
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletebuilding = await pool.query(
        "DELETE FROM building WHERE buildingid = $1",
        [id]
      );
      res.json("Building was deleted!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { bname } = req.body;
      await pool.query(
        "UPDATE building SET bname = $1 WHERE buildingid = $2",
        [bname,id]
      );
      res.send("Passenger was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
export default router;