import React from 'react';
// import useAuth from '../../Hooks/useAuth';

import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
// image hosting in imgbb 
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log("img host-key", image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Signup = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const { createUser, updatedUserProfile } = useAuth();
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('image', data.photo[0]);
            
            const imgbbResponse = await axiosPublic.post(image_hosting_api, formData);
            const imageUrl = imgbbResponse.data.data.url;
            
            const userInfo = {
                name: data.name,
                email: data.email,
                image: imageUrl
            };
            
            const userCreationResult = await createUser(data.email, data.password);
            const loggedUser = userCreationResult.user;
            
            await updatedUserProfile(data.name, imageUrl);
            
            const databaseResponse = await axiosPublic.post('/users', userInfo);
            
            if (databaseResponse.data.insertedId) {
                console.log('User added to the database');
                reset();
                navigate('/')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Create Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
      console.log(watch())
    return (
        <>
            <div className="hero min-h-screen bg-[#0489D7]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <img src="https://i.ibb.co/NCs6g9H/hero-img.png" alt="" />
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-[#108FD9]">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h1 className="text-5xl font-bold text-white">Sign Up now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Your name" className="input input-bordered" required />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="file" {...register('photo', { required: true })} name="photo" placeholder="Photo Url" className="file-input file-input-bordered w-full max-w-xs" required />
                                {errors.photo && <span className="text-red-600">Photo Url is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register('email', { required: true })} name="email" placeholder="email" className="input input-bordered" required />
                                {errors.email && <span className="text-red-600">email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register('password', {
                                    required: true,
                                    minLength: 4,
                                    maxLength: 20,
                                    // apssword validation pattan 
                                    // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                                })} name='password' placeholder="password" className="input input-bordered" required />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {/* {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>} */}
                                {errors.password && <span className="text-red-600">Password is required</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">

                                <input className="btn btn-primary bg-[#CC2229] hover:bg-slate-900 border-0" type="submit" value="Sign Up" />
                            </div>
                            <p className="ml-6"> <small>Already Have an Account ? <Link to="/login" className="text-blue-600 underline">Log In</Link></small> </p>
                            {/* <SocialLogin></SocialLogin> */}
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;