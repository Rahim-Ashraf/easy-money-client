import { createContext, useState } from "react";

export const AuthContext = createContext(null)

const Provider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access-token"));

    const register = () => {
        setAccessToken(localStorage.getItem("access-token"))
    }
    const login = () => {
        setAccessToken(localStorage.getItem("access-token"))
    }

    const logOut = () => {
        setAccessToken(null)
    }

    const data = {
        accessToken,
        register,
        login,
        logOut,
    }
    return (
        <div>
            <AuthContext.Provider value={data}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default Provider;