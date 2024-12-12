import express from 'express';
import BuildingRouter from './BuildingRouter.js'
import ClassroomRouter from './ClassroomRouter.js'
import TeacherRouter from './TeacherRouter.js'

const app = express();
app.use(express.json())
app.get("/",(req,res) => {
    res.send("hello world")
})

app.use("/building",BuildingRouter)

app.use("/classroom",ClassroomRouter)

app.use("/teacher",TeacherRouter)

app.listen(5000,() => {
    console.log("Server is running on port 5000")
})
