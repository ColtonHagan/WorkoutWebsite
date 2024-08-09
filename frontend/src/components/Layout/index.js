import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../NavBar";
import "./index.scss";

const Layout = () => {
    return (
        <main className="App">
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </main>
    )
}

export default Layout