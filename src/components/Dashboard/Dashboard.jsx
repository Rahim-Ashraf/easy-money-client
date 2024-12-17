import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Dashboard = () => {
    const { currentAccount } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [loader, setLoader] = useState(false)
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setLoader(true)
        axiosSecure.get("/users")
            .then(res => {
                setUsers(res.data);
                setLoader(false)
            })
    }, [axiosSecure]);
    console.log(currentAccount)
    const handleUserApprove = (user) => {
        if (user.role === "pending_user") {
            axiosSecure.patch(`/users?userId=${user._id}`, { role: "user" })
                .then(res => {
                    console.log(res.data)
                })
        } else if (user.role === "pending_agent") {
            axiosSecure.patch(`/users?userId=${user._id}`, { role: "agent" })
                .then(res => {
                    console.log(res.data)
                })
        }
    }


    if (loader) {
        return <h1>Loading.....</h1>
    }
    return (
        <>
            {
                currentAccount.role === "admin" ?
                    <div>
                        <h4 className="text-xl text-center py-4 font-bold">users</h4>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>User name</th>
                                        <th>User email</th>
                                        <th>Role</th>
                                        <th>Verify</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, idx) => <tr key={user._id}>
                                            <th>{idx + 1}</th>
                                            <td>{user.userName}</td>
                                            <td>{user.email}</td>
                                            <td className="font-bold">{user.role === "pending_user" ? "Applied for User" : user.role === "pending_agent" ? "Applied for Agent" : user.role}</td>
                                            <td className="space-y-1">
                                            {user.role==="user"||user.role==="agent"||user.role==="admin"?<span>Verified</span>:<button onClick={() => handleUserApprove(user)} className="btn bg-emerald-600 text-white">Approve</button>}
                                            </td>
                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div >
                    :
                    currentAccount.role === "agent" ?
                        < div className="flex justify-evenly" >
                            <Link to="/cash-in-request">
                                <div>
                                    <img src="./assets/cash-in.png" alt="Send Money" />
                                    <h4 className="text-xl text-center py-4 font-bold">Cash In Request</h4>
                                </div>
                            </Link>
                            <Link to="/cash-out-request">
                                <div>
                                    <img src="./assets/cash-out.png" alt="Cash Out" />
                                    <h4 className="text-xl text-center py-4 font-bold">Chash Out Request</h4>
                                </div>
                            </Link>
                        </div >
                        :
                        currentAccount.role === "user" ?
                            < div className="flex justify-evenly" >
                                <Link to="/send-money">
                                    <div>
                                        <img src="./assets/send-money.png" alt="Send Money" />
                                        <h4 className="text-xl text-center py-4 font-bold">Send Money</h4>
                                    </div>
                                </Link>
                                <Link to="/cash-out">
                                    <div>
                                        <img src="./assets/cash-out.png" alt="Cash Out" />
                                        <h4 className="text-xl text-center py-4 font-bold">Chash Out</h4>
                                    </div>
                                </Link>
                            </div >
                            :
                            <h2>Please wait for the Admin Approval</h2>
            }
        </>
    );
};

export default Dashboard;