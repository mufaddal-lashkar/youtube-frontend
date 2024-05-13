import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home, Login } from './pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="wrapper">
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
            </Routes>
          </Router>
        </div>
    </>
  )
}

export default App
