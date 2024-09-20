import {useState} from 'react';
import './index.scss';
import { NavLink } from "react-router-dom";
import useLogout from '../../hooks/useLogout';
import Logo from "../../assets/TempLogoUnderline.png"
import EmptyProfile from "../../assets/EmptyProfile.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const logout = useLogout();

  return (
    <header className="nav-bar">
      <FontAwesomeIcon onClick={() => setMenu(!menu)} icon={menu ? faClose : faBars} className="mobile-menu" />
      <NavLink className='logo' to="/">
        <img src={Logo} alt="ByteBrawn Logo" />
      </NavLink>
      <nav className={menu ? "mobile" : ""} onClick={() => setMenu(false)}>
        <NavLink id="home-link" to="/">
          Dashboard
        </NavLink>
        <NavLink id="plan-link" to="/exercises">
          Create Workout
        </NavLink>
        <NavLink id="public-link" to="/public">
          Public Workouts
        </NavLink>
      </nav>
      <div className='profile'>
        <img src={EmptyProfile} alt="Profile" />
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  )
}

export default NavBar