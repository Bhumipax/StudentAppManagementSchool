import express, { request } from 'express';
import pool from '../database.js'

const router = express.Router()
router.get('/',async(req,res) => {
  try{
    const educationdata =  await pool.query("SELECT * FROM educationdata")
    res.json(educationdata.rows)
  }catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
    try {
      const { academicyear,gpa,semester,totalcredit,passedcredit,studentid } = req.body;
      await pool.query("INSERT INTO educationdata (academicyear,gpa,semester,totalcredit,passedcredit,studentid) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[academicyear,gpa,semester,totalcredit,passedcredit,studentid] ) 
      res.send("Educationdata created successfully")
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
});

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteeducationdata = await pool.query(
        "DELETE FROM educationdata WHERE educationdataid = $1",
        [id]
      );
      res.json("Educationdata was deleted!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
});

router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { academicyear,gpa,semester,totalcredit,passedcredit } = req.body;
      await pool.query(
        "UPDATE educationdata SET academicyear = $1,gpa = $2,semester = $3,totalcredit = $4,passedcredit = $5 WHERE educationdataid = $6",
        [academicyear,gpa,semester,totalcredit,passedcredit,id]
      );
      res.send("Educationdata was updated!");
    } catch (err) {
      console.error(err.message);
    }
});

export default router;