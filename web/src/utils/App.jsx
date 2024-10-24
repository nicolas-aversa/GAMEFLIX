import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import './index.css';
import Home from '../components/pages/Home/Home';
import SignUp from '../components/pages/Auth/SignUp';
import Login from '../components/pages/Auth/Login';
import Header from '../components/Header';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Puedes agregar más rutas aquí según sea necesario */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;