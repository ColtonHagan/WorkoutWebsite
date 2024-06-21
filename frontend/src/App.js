import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';

import Home from './views/Home';
import Signup from './views/Signup'
import Login from './views/Login'
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;