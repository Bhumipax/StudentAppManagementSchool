import express from 'express';
import BuildingRouter from './router/BuildingRouter.js'
import ClassroomRouter from './router/ClassroomRouter.js'
import TeacherRouter from './router/TeacherRouter.js'
import StudentRouter from './router/StudentRouter.js'
import ScheduleRouter from './router/ScheduleRouter.js'
import SubjectRouter from './router/SubjectRouter.js'

const app = express();
app.use(express.json())
app.get("/",(req,res) => {
    res.send("hello world")
})

app.use("/building",BuildingRouter)

app.use("/classroom",ClassroomRouter)

app.use("/teacher",TeacherRouter)

app.use("/student",StudentRouter)

app.use("/schedule",ScheduleRouter)

app.use("/subject",SubjectRouter)

app.listen(5000,() => {
    console.log("Server is running on port 5000")
})
