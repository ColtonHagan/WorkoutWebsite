import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './views/Home';
import Exercise from './views/Exercise';
import Signup from './views/Signup';
import Login from './views/Login';
import RequireAuth from './util/RequireAuth';
import PersistLogin from './util/PersistLogin';
import Layout from './components/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}> {/** Combine this and required auth into a single file AuthHandler */}
          <Route element={<RequireAuth />}>
            <Route index element={<Home />} />
            <Route path="/exercises" element={<Exercise />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
