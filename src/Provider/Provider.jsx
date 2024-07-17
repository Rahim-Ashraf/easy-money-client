import axios from "axios";
import { createContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

export const AuthContext = createContext(null);

const Provider = ({ children }) => {
    const axiosSecure = useAxiosSecure();
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access-token"));
    const [currentAccount, setCurrentAccount] = useState({});
    const [balance, setBalance] = useState("");

    useEffect(() => {
        axiosSecure.get("/user")
            .then(res => {
                setCurrentAccount(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [axiosSecure, accessToken])

    useEffect(() => {
        axios.get(`http://localhost:3000/balance?userId=${currentAccount._id}`)
            .then(res => {
                setBalance(res.data.balance)
            })
    }, [currentAccount])
    // useEffect(() => {
    //     axios.get(`http://localhost:3000/user?userId=${currentAccount}`, accessToken)
    //         .then(res => {
    //             console.log(res.data)
    //             setBalance(res.data.balance)
    //         })
    // }, [accessToken])


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