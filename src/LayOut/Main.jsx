import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Home/Navbar/NavBar";


const Main = () => {
    return (
        <div className="bg-[#0489D7]">
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;