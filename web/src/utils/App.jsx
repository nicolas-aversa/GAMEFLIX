import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'
import Home from '../components/pages/Home/Home';
import SignUp from '../components/pages/Auth/SignUp';
import Login from '../components/pages/Auth/loginn';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = '/' element={<Home />} />
          <Route path = '/signup' element={<SignUp />} />
          <Route path = '/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;