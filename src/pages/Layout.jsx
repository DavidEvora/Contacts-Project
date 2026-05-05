import { Outlet } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import "../index.css"

export const Layout = () => {
    return (
        <ScrollToTop>
            <div className="flex flex-col min-h-screen bg-primary">
                <Navbar />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </ScrollToTop>
    )
}