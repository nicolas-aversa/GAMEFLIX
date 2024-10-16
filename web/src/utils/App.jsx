import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Layout from '../components/layout';
import Home from '../components/pages/Home/Home';
import SignUp from '../components/pages/Auth/SignUp';
import Login from '../components/pages/Auth/Login';
import Header from '../components/header';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Puedes agregar más rutas aquí según sea necesario */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;