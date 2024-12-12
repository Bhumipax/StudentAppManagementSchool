import express, { request } from 'express';
import pool from './database.js'

const router = express.Router()

router.post("/", async (req, res) => {
  try {
      const { teacherid, tfname, tlname, tgender, tage, tphonenumber, tposition, address } = req.body;
      const result = await pool.query(
          "INSERT INTO teacher (teacherid, tfname, tlname, tgender, tage, tphonenumber, tposition, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
          [teacherid, tfname, tlname, tgender, tage, tphonenumber, tposition, address]
      );
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
    try {
      const { teacherid,tfname,tlname,tgender,tage,tphonenumber,tposition,address } = req.body;
      await pool.query("INSERT INTO teacher (teacherid,tfname,tlname,tgender,tage,tphonenumber,tposition,address) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *"
        ,[teacherid,tfname,tlname,tgender,tage,tphonenumber,tposition,address] ) 
      res.send("Teacher created successfully")
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteteacher = await pool.query(
        "DELETE FROM teacher WHERE teacherid = $1",
        [id]
      );
      res.json("Teacher was deleted!");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  });




export default router;