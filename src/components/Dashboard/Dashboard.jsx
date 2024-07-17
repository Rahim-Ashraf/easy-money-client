import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";

const Dashboard = () => {

    const { currentAccount } = useContext(AuthContext);


    return (
        <div className="flex justify-evenly">
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
        </div>
    );
};

export default Dashboard;