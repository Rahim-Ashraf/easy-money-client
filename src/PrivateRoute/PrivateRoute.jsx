import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { accessToken } = useContext(AuthContext);
    const location = useLocation();

    return (
        <div>
            {
                // loading ? <div className="w-full flex justify-center">
                //     <span className="loading loading-spinner loading-lg flex justify-center items-center h-screen"></span>
                // </div> :
                accessToken ? children :
                    <Navigate state={location.pathname} to={"/login"}></Navigate>
            }
        </div>
    );
};

export default PrivateRoute;