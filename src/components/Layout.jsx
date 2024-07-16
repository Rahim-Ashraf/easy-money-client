import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";


const Layout = () => {
    const { accessToken, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        localStorage.removeItem("access-token");
        logOut();
    }

    return (
        <>
            {accessToken && <button onClick={handleLogout} className="btn btn-error text-white">Logout</button>}
            <Outlet></Outlet>
        </>
    );
};

export default Layout;