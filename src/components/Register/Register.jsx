import axios from "axios";
import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/Provider";


const Register = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(true);
    const [registerError, setRegisterError] = useState("");

    const { register } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError("");
        const name = e.target.name.value;
        const number = e.target.number.value;
        const email = e.target.email.value;
        const PIN = e.target.PIN.value;

        if (PIN.length < 5 || PIN.length > 5) {
            setRegisterError("password should be 5 numbers");
            return
        } else if (!/^\d{5}$/.test(PIN)) {
            setRegisterError("password should have only numbers");
            return
        }
        const userData = {
            name,
            email,
            PIN,
            number,
            role: "pending",
        }

        axios.post("http://localhost:3000/users", userData)
            .then(res => {
                console.log(res.data)
                if (res.data.acknowledged === true) {
                    e.target.name.value = "";
                    e.target.email.value = "";
                    e.target.PIN.value = "";
                    const jwtUser = { email: email };
                    axios.post('http://localhost:3000/jwt', jwtUser)
                        .then((res) => {
                            localStorage.setItem("access-token", res.data.token);
                            navigate("/");
                            register();
                        })
                }
            })
    }

    return (
        <div data-aos="fade-up" data-aos-duration="2000" className="card mt-10 shadow-2xl bg-base-100 w-full md:w-2/3 lg:w-1/2 mx-auto">
            <div className="card-body">
                <form onSubmit={handleRegister}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Number</span>
                        </label>
                        <input type="number" name="number" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">PIN</span>
                        </label>
                        <div className="relative">
                            <span onClick={() => setShowPass(!showPass)} className="absolute right-2 top-4">{showPass ? <FaEye className="cursor-pointer w-10" /> : <IoMdEyeOff className="cursor-pointer w-10" />}</span>
                            <input type={showPass ? "password" : "text"} name="PIN" placeholder="PIN" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    <p className="text-red-600">
                        {registerError}
                    </p>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-[#0055ff] text-white">Register</button>
                    </div>
                </form>


                <div className="flex justify-between">
                    <div>
                        <span className="font-bold">Alredy Have an Account?</span>
                        <Link to="/login" className="text-blue-600 font-bold"> Login</Link>
                    </div>
                    <div>
                        <span className="font-bold">Go to </span><Link to="/" className="btn bg-[#0055ff] text-white font-semibold"> Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;