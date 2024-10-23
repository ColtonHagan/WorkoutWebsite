import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import TempTesting from './TempTesting'; //temp for testing obvously

import Home from './views/Home';
import Exercise from './views/Exercise';
import Public from './views/PublicPlans';
import AuthForm from './views/AuthForm';
import AuthHandler from './components/AuthHandler';
import ErrorPage from './views/ErrorPage';
import Layout from './components/Layout';
import { WorkoutPlansProvider } from './context/WorkoutPlansProvider';
import { WorkoutsProvider } from './context/WorkoutProvider';

/**
 * Main application component that defines the routing structure.
 */
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthForm isLoginMode={true}/>} />
      <Route path="/signup" element={<AuthForm isLoginMode={false} />} />

      <Route element={<AuthHandler />}>
        <Route path="/"
          element={
            <WorkoutPlansProvider>
              <WorkoutsProvider>
                <Layout />
              </WorkoutsProvider>
            </WorkoutPlansProvider>
          }
        >
          <Route index element={<Home />} />
          <Route path="/exercises" element={<Exercise />} />
          <Route path="/public" element={<Public />} />
        </Route>
      </Route>

      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
