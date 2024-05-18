import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home, Login, Register, Layout, Profile, Shorts, Subscriptions, Search, Video } from './pages'
import { ProtectedRoute } from './components'

function App() {

  return (
    <>
        <div className="wrapper">
          <Router>
            <Routes>
              <Route exact path="/" element={<Layout />}>
                <Route path='' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
                <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
                <Route path='shorts' element={<ProtectedRoute><Shorts /></ProtectedRoute>}/>
                <Route path='subscriptions' element={<ProtectedRoute><Subscriptions /></ProtectedRoute>}/>
                <Route path='search' element={<ProtectedRoute><Search /></ProtectedRoute>}/>
                <Route path='video' element={<ProtectedRoute><Video /></ProtectedRoute>}/>
              </Route>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
            </Routes>
          </Router>
        </div>
    </>
  )
}

export default App
