import { Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Registration from "./pages/Registration.jsx";
import LogIn from "./pages/LogIn.jsx";
import AboutUs from "./pages/AboutUs.jsx"
import UserPage from "./pages/UserPage.jsx"
function NavRouters(){
    return(
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>} />
                <Route path="home" element={<Home/>} />
                <Route path="aboutUs" element={<AboutUs/>} />
                {/* <Route path="registration" element={<Registration/>} />
                <Route path="LogIn" element={<LogIn/>} /> */}
                
            </Route>
            <Route path="yourPage" element={<UserPage/>} />
        </Routes>
    )
}
export default NavRouters;