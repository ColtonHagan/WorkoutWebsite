import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../NavBar";
import "./index.scss";

/**
 * Layout component that serves as a wrapper with navbar and footer.
 *
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