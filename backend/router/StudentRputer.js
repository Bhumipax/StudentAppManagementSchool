import express, { request } from 'express';
import pool from '../database.js'

const router = express.Router()

router.get('/',async(req,res) => {
    try{
        const student =  await pool.query("SELECT * FROM student")
        res.json(teacher.rows);
    }catch (err){
        console.error(err.message);
        res.status(500).send("Server Error");

    }
});

router.post("/", async (req, res) => {
    try {
      const { studentid,sfname,slname,sgender,sage,sphonenumber,address } = req.body;
      await pool.query("INSERT INTO student (studentid,sfname,slname,sgender,sage,sphonenumber,address) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *"
        ,[studentid,sfname,slname,sgender,sage,sphonenumber,address] ) 
      res.send("Student created successfully")
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletestudent = await pool.query(
        "DELETE FROM student WHERE studentid = $1",
        [id]
      );
      res.json("Student was deleted!");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { studentid,sfname,slname,sgender,sage,sphonenumber,address  } = req.body;
      await pool.query(
        "UPDATE student SET studentid=$1,sfname=$2,slname=$3,sgender=$4,sage=$5,sphonenumber=$6,address=$7",
        [bname,id]
      );
      res.send("Student was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });




export default router;