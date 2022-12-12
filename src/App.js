import React from 'react'
import Home from './pages/Home'
import Admission from './pages/Admission'
import Applicants from './pages/Applicants'
import NavBar from './components/Navbar'
import './App.css'
import './Custom.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    // <Home/>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admission" element={<Admission />} />
        <Route path="/Applicants" element={<Applicants />} />
      </Routes>

    </Router>
  )
}

export default App