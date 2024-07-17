import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Dashboard from "../components/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SendMoney from "../components/Dashboard/SendMoney/SendMoney";
import CashOut from "../components/Dashboard/CashOut/CashOut";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: "/send-money",
                element: <PrivateRoute><SendMoney></SendMoney></PrivateRoute>
            },
            {
                path: "/cash-out",
                element: <PrivateRoute><CashOut></CashOut></PrivateRoute>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
        ]
    },
]);

export default router;