import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";


const Login = () => {
    const { signIn } = useAuth()
    // const [showError, setShowError] = useState('')
    // const [success, setSuccess] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"

    const handleLogIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                navigate('/');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log In SuccessFully",
                    showConfirmButton: false,
                    timer: 1500
                });
               
            }).catch(error => {
                // setShowError('Invalid email or Password')

            })
    }
    return (
        <>
            <div className="hero min-h-screen bg-[#0489D7]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        {/* <Lottie animationData={loginAnimetion}></Lottie> */}
                        <img src="https://i.ibb.co/NCs6g9H/hero-img.png" alt="" />

                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-[#108FD9]">

                        <form onSubmit={handleLogIn} className="card-body">
                            <h1 className="text-5xl font-bold text-white">Login now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            
                            <div className="form-control mt-4">

                                <input className="btn btn-primary bg-[#BC3433] border-0 hover:bg-slate-900" type="submit" value="Login" />
                            </div>
                            <p className='ml-8'> <small>Don't have an account ?<Link to="/signup" className="text-blue-600 underline">Create an Account</Link></small> </p>
                           
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;