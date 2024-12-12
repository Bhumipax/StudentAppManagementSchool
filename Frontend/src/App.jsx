import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Detail from './components/Detial'
import Schedule from './components/Schedule'
import Studentstatus from './components/Studentstatus'
import StudentData from './components/StudentData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login/>
    </>
  )
}

export default App
