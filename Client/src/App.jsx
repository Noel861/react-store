import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import CreatePage from './pages/createpage'
import Navbar from './components/navbar';
import './navbar.css';
import './createpage.css'
import './homepage.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      </div>
  )
}
export default App