import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";
import axios from "axios";
import Swal from "sweetalert2";


const Login = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation()

    const handleLogin = e => {
        e.preventDefault();
        const NumEmail = e.target.NumEmail.value;
        const PIN = e.target.PIN.value;
        axios.get("http://localhost:3000/users")
            .then(res => {
                const users = res.data;
                const account = users.find(user => (user.email === NumEmail || user.number === NumEmail) && user.PIN === PIN);
                if (account) {
                    const jwtUser = { email: NumEmail };
                    axios.post('http://localhost:3000/jwt', jwtUser)
                        .then((res) => {
                            Swal.fire({
                                icon: "success",
                                title: "Login success.",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                            localStorage.setItem("access-token", res.data.token);
                            navigate(location.state ? `${location.state}` : "/");
                            login();
                        })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Login failed.",
                        text: "Email/Number or PIN incorrect!",
                    });
                }
            })
    }

    return (
        <div data-aos="fade-up" data-aos-duration="2000" className="card mt-10 shrink-0 shadow-2xl bg-base-100 w-full md:w-2/3 lg:w-1/2 mx-auto">
            <div className="card-body">
                <h2 className="text-2xl font-bold text-center pt-4">Please Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email / Number</span>
                        </label>
                        <input type="text" name="NumEmail" placeholder="Email/number" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">PIN</span>
                        </label>
                        <input type="password" name="PIN" placeholder="PIN" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#0055ff] text-white">Login</button>
                    </div>
                </form>
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold">New here?</span>
                        <Link to="/register" className="text-blue-600 font-bold"> Register Now</Link>
                    </div>
                    <div>
                        <span className="font-bold">Go to </span><Link to="/" className="btn bg-[#0055ff] text-white font-semibold"> Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;