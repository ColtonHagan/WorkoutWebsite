import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import Logo from '../../assets/LogoUnderline.png';
import EmptyProfile from '../../assets/EmptyProfile.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import './index.scss';

/**
 * Navigation Bar includes logo, navigation links, and a profile logout.
 * 
 * It toggles a mobile hamburger menu for smaller screens.
 */
const NavBar = () => {
    const [menu, setMenu] = useState(false);
    const logout = useLogout();

    const toggleMenu = () => {
        setMenu((prevMenu) => !prevMenu);
    };

    const closeMenu = () => {
        setMenu(false);
    };

    return (
        <header className="nav-bar">
            <div className="menu-icon" onClick={toggleMenu} aria-label="Toggle Menu">
                {menu ? <FaTimes className="mobile-menu" /> : <FaBars className="mobile-menu" />}
            </div>
            <NavLink className="logo" to="/">
                <img src={Logo} alt="ByteBrawn Logo" />
            </NavLink>
            <nav className={menu ? 'mobile' : ''} onClick={closeMenu} aria-label="Navigation Menu">
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
            <div className="profile">
                <img src={EmptyProfile} alt="Profile" />
                <button onClick={logout} aria-label="Logout">Logout</button>
            </div>
        </header>
    );
};

export default NavBar;
