import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import Home from './views/Home';
import Exercise from './views/Exercise';
import Public from './views/PublicPlans';
import Signup from './views/Signup';
import Login from './views/Login';
import AuthHandler from './components/AuthHandler';
import Layout from './components/Layout';
import TempTesting from './TempTesting';
import DropdownTest from './TempTesting/DropdownTest';
import { WorkoutPlansProvider } from './context/WorkoutPlansProvider';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<AuthHandler />}>
        <Route path="/"
          element={
            <WorkoutPlansProvider>
              <Layout />
            </WorkoutPlansProvider>
          }
        >
          {/*auth handler used to be here*/}
          <Route index element={<Home />} />
          <Route path="/exercises" element={<Exercise />} />
          <Route path="/public" element={<DropdownTest />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
