import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import NavBar from "./NavBar"

const Layout = () => {
    return (
        <main className="App">
            <NavBar />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Layout