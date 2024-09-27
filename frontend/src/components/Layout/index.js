import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../NavBar";
import "./index.scss";

/**
 * Layout component that serves as a wrapper for the main application structure.
 *
 * This component includes a navigation bar at the top, an outlet for nested routes,
 * and a footer at the bottom.
 */
const Layout = () => {
    return (
        <div className="App" >
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout