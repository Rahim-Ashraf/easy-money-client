import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const Provider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access-token"));
    const [currentAccount, setCurrentAccount] = useState("");
    const [balance, setBalance] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:3000/balance?userId=${currentAccount}`)
            .then(res => {
                console.log(res.data)
                setBalance(res.data.balance)
            })
    }, [currentAccount])
    console.log(currentAccount)
    const accountId = (userId) => {
        setCurrentAccount(userId);
    }
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
        accountId,
        currentAccount,
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