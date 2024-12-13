import express, { request } from 'express';
import pool from '../database.js'

const router = express.Router()

router.get('/',async(req,res) => {
    try{
        const student =  await pool.query("SELECT * FROM student")
        res.json(student.rows);
    }catch (err){
        console.error(err.message);
        res.status(500).send("Server Error");

    }
});

router.post("/", async (req, res) => {
    try {
      const { studentid,sfname,slname,sgender,sage,sphonenumber,saddress } = req.body;
      await pool.query("INSERT INTO student (studentid,sfname,slname,sgender,sage,sphonenumber,saddress) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *"
        ,[studentid,sfname,slname,sgender,sage,sphonenumber,saddress] ) 
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
      const { studentid,sfname,slname,sgender,sage,sphonenumber,saddress  } = req.body;
      await pool.query(
        "UPDATE student SET studentid=$1,sfname=$2,slname=$3,sgender=$4,sage=$5,sphonenumber=$6,saddress=$7 WHERE studentid =$8 ",
        [ studentid,sfname,slname,sgender,sage,sphonenumber,saddress,id ]
      );
      res.send("Student was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });




export default router;