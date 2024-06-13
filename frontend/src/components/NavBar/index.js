import React from 'react';
import './index.scss';
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className='logo'>
        <Link to="/">Logo</Link>
      </div>
      <nav>
        <NavLink exact={+true} id="home-link" to="/">
          Home
        </NavLink>
        <NavLink exact={+true} id="plan-link" to="/exercises">
          Create Workout
        </NavLink>
        <NavLink exact={+true} id="stats-link" to="/stats">
          Statistics
        </NavLink>
      </nav>
    </div>
  )
}

export default NavBar