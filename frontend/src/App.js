import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';

import Home from './views/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
