import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Detail from './components/Detial'
import StudentData from './components/StudentData'
import TeacherData from './components/TeacherData'
import AddFromStudent from './components/AddFromStudent'
import AddFromTeacher from './components/AddFromTeacher'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/addstudent' element={<AddFromStudent/>}/>
          <Route path='/' index element={<Detail />}/>
          <Route path='/addteacher' element={<AddFromTeacher/>}/>
          <Route path='/studentdata' element={<StudentData/>}/>
          <Route path='/teacherdata' element={<TeacherData/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
