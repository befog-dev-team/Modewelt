"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import "@/app/(main)/css/Auth.css";
import toast from "react-hot-toast";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { login } from "./loginActions";
import { signUp } from "./signupActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/lib/validation";
import { Loader2, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [active, setActive] = useState(false); // for switching between login and signup form
  const router = useRouter(); // for navigation
  const [pending, startTransition] = useTransition(); // for transition
  const [error, setError] = useState(undefined); // for error handling
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Login Form
  const {
    register: loginRegister, // register function
    handleSubmit: handleLoginSubmit, // submit function
    formState: { isSubmitting: isLoginSubmitting }, // form state
  } = useForm({
    // form hook
    resolver: zodResolver(loginSchema), // validation schema
    defaultValues: {
      email: "", // default values
      password: "", // default values
    },
  });

  // Login function
  const handleLogin = async (data) => {
    try {
      setError(undefined); // reset error
      // Convert email to lowercase
      data.email = data.email.toLowerCase();
      // Start transition
      startTransition(async () => {
        const { error } = await login(data); // login action
        if (error) {
          setError(error); // set error
          toast.error(error); // error toast
        }
        else {
          toast.success("Login Successful"); // success message
          router.push("/feed"); // navigate to home page
        }
      });
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed"); // set error
      toast.error("Login Failed"); // error toast
    }
  };

  // Signup Form
  const {
    register: signupRegister, // register function
    handleSubmit: handleSignupSubmit, // submit function
    formState: { isSubmitting: isSignupSubmitting }, // form state
  } = useForm({
    // form hook
    resolver: zodResolver(signupSchema), // validation schema
    defaultValues: {
      username: "", // username default value
      email: "", // email default value
      phone: "", // phone default value
      password: "", // password default value
      confirmPassword: "", // confirm password default value
    },
  });

  // Signup function
  const handleSignup = async (data) => {
    try {
      // Reset error
      setError(undefined);

      // Convert email and username to lowercase
      data.email = data.email.toLowerCase();
      data.username = data.username.toLowerCase();

      // Check if password and confirm password match
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      // Start transition
      startTransition(async () => {
        const { error } = await signUp(data); // signup action
        if (error) {
          setError(error); // set error
          toast.error(error); // error toast
        }
        else {
          toast.success(
            "Signup successful! Please check your email for verification."
          ); // success message
        }
      });
    } catch (err) {
      setError(err.response?.data?.message || "Signup Failed"); // set error
      toast.error("Signup Failed"); // error toast
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#dcf59d] min-h-screen relative">

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-500 text-white p-2 rounded-md text-center absolute top-4 left-1/2 transform -translate-x-1/2">
          {error}
        </div>
      )}

      {/* AUTH CONTAINER */}
      <div
        className={`auth-container relative z-10 h-[524px] w-[957px] border-[#fc3fb4] border-2 flex bg-background shadow-lg rounded-2xl max-w-4xl ${active ? "active" : ""}`}
      >
        <div className="curved-shape1"></div>
        <div className="curved-shape2"></div>

        {/* LOGIN FORM */}
        <div
          className={`form-box Login w-full md:w-full absolute transition-all duration-500 ${active ? "opacity-0 -z-10 pointer-events-none" : "opacity-100 z-20 pointer-events-auto"}`}
        >
          <div className="relative">
            <h2
              className="animation text-center text-[2.5rem] font-[800] text-[#fc3fb4] mb-8 uppercase"
              style={{ "--D": 0, "--S": 21 }}
            >
              Login
            </h2>
            {/* Login heading underline */}
            <div
              className="animation h-[0.4rem] w-[6rem] top-[3.7rem] md:top-[3.5rem] rounded-[10px] left-[6.15rem] md:left-[8.3rem] bg-[#fc3fb4] absolute"
              style={{ "--D": 1, "--S": 22 }}
            ></div>
          </div>
          <form onSubmit={handleLoginSubmit(handleLogin)}>
            <div
              className="input-box animation"
              style={{ "--D": 2, "--S": 23 }}
            >
              <input type="email" {...loginRegister("email")} required />
              <label htmlFor="login_username">Email</label>
              <i className="bx bxs-user"></i>
            </div>
            <div
              className="input-box animation"
              style={{ "--D": 3, "--S": 24 }}
            >
              <input
                type={showPassword ? "text" : "password"}
                {...loginRegister("password")}
                required
              />
              <label htmlFor="login_password">Password</label>
              <span className="absolute right-[-1px] top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePassword}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              {/* <i className="bx bxs-lock-alt"></i> */}
            </div>

            {/* Links and buttons */}
            <div
              className="animation flex justify-between text-sm mt-2 text-blue-500 uppercase"
              style={{ "--D": 4, "--S": 25 }}
            >
              <Link href="/auth/forget-password" prefetch={true}>Forgot Password</Link>
              <p
                className="SignUpLink cursor-pointer"
                onClick={() => setActive(true)}
              >
                {/* Create Account */}
                <span
                  className="cursor-pointer"
                  onClick={() => setActive(true)}
                >
                  Create Account
                </span>
              </p>
            </div>

            <div
              className="input-box animation"
              style={{ "--D": 5, "--S": 26 }}
            >
              <button
                type="submit"
                disabled={isLoginSubmitting}
                className={`uppercase w-full ${pending
                  ? "bg-[#fc3fb4] hover:bg-[#fc3fb4] cursor-not-allowed"
                  : "bg-[#fc3fb4] hover:bg-[#fc3fb4]"
                  } text-white py-3 px-4 rounded-full transition duration-300`}
              >
                {pending ? (
                  <Loader2 className="mx-auto animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
            </div>

            {/* Registration link */}
            <div
              className="regi-link animation mt-6 text-center text-sm text-gray-600 uppercase"
              style={{ "--D": 6, "--S": 27 }}
            >
              <p>
                Don&apos;t have an account?{" "}
                <span
                  className="SignUpLink text-[#fc3fb4] font-bold hover:underline cursor-pointer"
                  onClick={() => setActive(true)}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </form>
        </div>

        {/* INFO CONTENT */}
        <div className="info-content Login text-white uppercase w-full md:w-auto relative md:top-[5%] md:block">
          <h2
            className="relative animation text-3xl md:text-6xl font-bold mb-2 w-full md:w-[115%] right-0 md:right-[15%] hidden md:block"
            style={{ "--D": 0, "--S": 20 }}
          >
            WELCOME BACK !
          </h2>
          <p className="animation text-sm hidden md:block" style={{ "--D": 1, "--S": 21 }}>
            Sign up and gain access to the latest fashion job openings, networking opportunities, and industry insights. Whether you&apos;re a creative visionary or a strategic marketer, your dream role is waiting!
          </p>
        </div>

        {/* REGISTRATION FORM */}
        <div
          className={`form-box Register w-full md:w-full absolute transition-all duration-500 ${active ? "opacity-100 z-20 pointer-events-auto" : "opacity-0 -z-10 pointer-events-none"}`}
        >
          <div className="relative">
            <h2
              className="animation text-center text-[2.5rem] font-[800] text-[#fc3fb4] uppercase"
              style={{ "--li": 17, "--S": 0 }}
            >
              Sign Up
            </h2>
            {/* Signup heading underline */}
            <div
              className="animation h-[0.4rem] w-[6rem] top-[3.5rem] rounded-[10px] left-[8.5rem] bg-[#fc3fb4] absolute"
              style={{ "--li": 18, "--S": 1 }}
            ></div>
          </div>
          <form onSubmit={handleSignupSubmit(handleSignup)}>
            <div
              className="input-box animation"
              style={{ "--li": 19, "--S": 2 }}
            >
              <input type="text" {...signupRegister("username")} required />
              <label htmlFor="register_username">Username</label>
              <i className="bx bxs-user-rectangle"></i>
            </div>
            <div
              className="input-box animation"
              style={{ "--li": 20, "--S": 3 }}
            >
              <input type="email" {...signupRegister("email")} required />
              <label htmlFor="register_email">Email</label>
              <i className="bx bxs-envelope"></i>
            </div>
            <div
              className="input-box animation"
              style={{ "--li": 21, "--S": 4 }}
            >
              <input type="text" {...signupRegister("phone")} required />
              <label htmlFor="register_phone">Phone</label>
              <i className="bx bxs-phone"></i>
            </div>
            <div
              className="input-box animation"
              style={{ "--li": 22, "--S": 5 }}
            >
              <input
                type={showPassword ? "text" : "password"}
                {...signupRegister("password")}
                required
              />
              <label htmlFor="register_password">Password</label>
              <span className="absolute right-[-1px] top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePassword}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              {/* <i className="bx bxs-lock-alt"></i> */}
            </div>
            <div
              className="input-box animation"
              style={{ "--li": 23, "--S": 6 }}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...signupRegister("confirmPassword")}
                required
              />
              <label htmlFor="register_confirm_password">
                Confirm Password
              </label>
              <span className="absolute right-[-1px] top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={toggleConfirmPassword}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              {/* <i className="bx bxs-lock"></i> */}
            </div>

            <div
              className="input-box animation"
              style={{ "--li": 24, "--S": 7 }}
            >
              <button
                type="submit"
                disabled={isSignupSubmitting}
                className={`uppercase w-full ${pending
                  ? "bg-[#fc3fb4] hover:bg-[#fc3fb4] cursor-not-allowed"
                  : "bg-[#fc3fb4] hover:bg-[#fc3fb4"
                  } text-white py-3 px-4 rounded-full transition duration-300`}
              >
                {pending ? (
                  <Loader2 className="mx-auto animate-spin" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {/* Registration link */}
            <div
              className="regi-link animation mt-6 text-center text-sm text-gray-600 uppercase"
              style={{ "--li": 25, "--S": 8 }}
            >
              <p>
                Already have an account?{" "}
                <span
                  className="SignInLink text-[#fc3fb4] font-bold hover:underline cursor-pointer"
                  onClick={() => setActive(false)}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
        <div className="info-content Register top-[10%] left-[-2%] md:block">
          <h2
            className="animation text-white text-6xl font-bold mb-6 hidden md:block"
            style={{ "--li": 17, "--S": 0 }}
          >
            WELCOME
          </h2>
          <p
            className="animation text-white text-sm mb-10 uppercase hidden md:block"
            style={{ "--li": 18, "--S": 1 }}
          >
            Your next career move in the fashion industry starts here. Log in to explore exclusive job opportunities tailored for designers, stylists, photographers, and marketing experts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
