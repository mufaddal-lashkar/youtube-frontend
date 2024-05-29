import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home, Login, Register, Layout, Profile, Shorts, Subscriptions, Search, Video, ChannelPage, ChannelTabHome, ChannelTabVideos, ChannelTabShorts, ChannelTabPlaylists, ChannelTabTweets, ChannelTabCommunity } from './pages'
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
                <Route path='search/:searchText' element={<ProtectedRoute><Search /></ProtectedRoute>}/>
                <Route path='video/:videoId' element={<ProtectedRoute><Video /></ProtectedRoute>}/>
                <Route path='channel/:channelId' element={<ProtectedRoute><ChannelPage /></ProtectedRoute>}>
                  <Route path='home' element={<ProtectedRoute><ChannelTabHome /></ProtectedRoute>}/>
                  <Route path='videos' element={<ProtectedRoute><ChannelTabVideos /></ProtectedRoute>}/>
                  <Route path='shorts' element={<ProtectedRoute><ChannelTabShorts /></ProtectedRoute>}/>
                  <Route path='playlists' element={<ProtectedRoute><ChannelTabPlaylists /></ProtectedRoute>}/>
                  <Route path='tweets' element={<ProtectedRoute><ChannelTabTweets /></ProtectedRoute>}/>
                  <Route path='community' element={<ProtectedRoute><ChannelTabCommunity /></ProtectedRoute>}/>
                </Route>
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
