import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { MyNavbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <MyNavbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}