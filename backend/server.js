import express from 'express';
import cors from 'cors';
import BuildingRouter from './router/BuildingRouter.js'
import ClassroomRouter from './router/ClassroomRouter.js'
import TeacherRouter from './router/TeacherRouter.js'
import EducationdataRouter from './router/EducationdataRouter.js'
import EnrollmentRouter from './router/EnrollmentRouter.js'
import ParentRouter from './router/ParentRouter.js'
import ScoredetailRouter from './router/ScoredetailRouter.js'
import StudentparentRouter from './router/studentparentRouter.js'
import Studenttimetable from './router/Studenttimetable.js'
import StudentRouter from './router/StudentRouter.js'
import ScheduleRouter from './router/ScheduleRouter.js'
import SubjectRouter from './router/SubjectRouter.js'

const app = express();
app.use(cors())
app.use(express.json())
app.get("/",(req,res) => {
    res.send("hello world")
})

app.use("/building",BuildingRouter)

app.use("/classroom",ClassroomRouter)

app.use("/teacher",TeacherRouter)

app.use("/enrollment",EnrollmentRouter)

app.use("/parent",ParentRouter)

app.use("/scoredetail",ScoredetailRouter)

app.use("/studentparent",StudentparentRouter)

app.use("/studenttimetable",Studenttimetable)

app.use("/educationdata",EducationdataRouter)

app.use("/student",StudentRouter)

app.use("/schedule",ScheduleRouter)

app.use("/subject",SubjectRouter)

app.listen(5000,() => {
    console.log("Server is running on port 5000")
})
