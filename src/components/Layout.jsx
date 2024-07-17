import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";


const Layout = () => {
    const { accessToken, logOut } = useContext(AuthContext);
    const [currentBalance, setCurrentBalance] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("access-token");
        logOut();
    }
    const handleCheckBalance = () => {
        console.log("balance");
    }

    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="flex justify-between">
                <Link to="/"><h2 className="text-2xl font-bold">Easy Money</h2></Link>
                {accessToken && <button onClick={handleCheckBalance} className="btn btn-error text-white">{accessToken ? currentBalance : "Check Balance"}</button>}
                {accessToken && <button onClick={handleLogout} className="btn btn-error text-white">Logout</button>}
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;