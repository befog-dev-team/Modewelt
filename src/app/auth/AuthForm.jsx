"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "@/app/(main)/css/Auth.css";
import toast from "react-hot-toast";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { login } from "./loginActions";
import { signUp } from "./signupActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/lib/validation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";

const Auth = () => {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(searchParams.get("mode") === "signup"); // for switching between login and signup form
  const router = useRouter(); // for navigation

  useEffect(() => {
    const mode = searchParams.get("mode");
    setActive(mode === "signup");
  }, [searchParams]);

  const toggleMode = (signup) => {
    const params = new URLSearchParams(searchParams.toString());
    if (signup) {
      params.set("mode", "signup");
    } else {
      params.delete("mode");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

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
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting }, // form state
    reset: resetLogin, // reset form
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
        const result = await login(data); // login action
        const { error } = result || {};
        if (error) {
          setError(error); // set error
          toast.error(error); // error toast
        }
        else {
          toast.success("Login Successful"); // success message
          resetLogin(); // reset form
          router.push("/feed"); // navigate to home page
        }
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login Failed"); // set error
      toast.error("Login Failed"); // error toast
    }
  };

  // Signup Form
  const {
    register: signupRegister, // register function
    handleSubmit: handleSignupSubmit, // submit function
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting }, // form state
    reset: resetSignup // reset form
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
    console.log("Submit button clicked! handleSignup called with data:", data);
    try {
      // Reset error
      setError(undefined);

      // Convert email and username to lowercase
      data.email = data.email.toLowerCase();
      data.username = data.username.toLowerCase();

      if (data.password.trim() !== data.confirmPassword.trim()) {
        toast.error("Passwords do not match!");
        return;
      }

      // Start transition
      startTransition(async () => {
        console.log("====> CLIENT: Calling signUp server action with data:", data);
        const result = await signUp(data);
        console.log("====> CLIENT: signUp response received:", result);
        const { error } = result || { error: "Something went wrong" };
        if (error) {
          setError(error); // set error
          toast.error(error); // error toast
        }
        else {
          toast.success("Account created! You can now log in.");
          resetSignup(); // reset form
          // Switch to login view so user can sign in immediately
          toggleMode(false);
        }
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup Failed"); // set error
      toast.error("Signup Failed"); // error toast
    }
  };

  return (
    <div className="flex justify-center items-center bg-white min-h-screen relative">

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-500 text-white p-2 rounded-md text-center absolute top-4 left-1/2 transform -translate-x-1/2">
          {error}
        </div>
      )}

      {/* AUTH CONTAINER */}
      <div
        className={`auth-container relative z-10 h-[580px] w-[957px] border-gray-200 border flex bg-[#ffffff] shadow-2xl rounded-2xl max-w-4xl ${active ? "active" : ""}`}
      >
        <div className="curved-shape1"></div>
        <div className="curved-shape2"></div>

        {/* LOGIN FORM */}
        <div
          className={`form-box Login w-full px-8 py-10 md:px-12 absolute transition-all duration-500 ${active ? "opacity-0 -z-10 pointer-events-none" : "opacity-100 z-20 pointer-events-auto"}`}
        >
          <div className="flex flex-col items-center mb-6">
            {/* Logo Placeholder */}
            <div className="w-12 h-12 bg-gradient-to-br from-[#fc3fb4] to-[#9466FF] rounded-2xl mb-2 shadow-xl flex items-center justify-center transform rotate-12">
              <span className="text-white font-black text-xl transform -rotate-12 inline-block">MW</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome</h2>
          </div>

          {/* Social Login */}
          <div className="mb-4">
            <a
              href="/api/auth/google"
              className="w-full h-12 bg-[#ffffff] hover:bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center gap-3 text-gray-800 font-medium transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                />
                <path
                  fill="#FBBC05"
                  d="M16.04 18.013c-1.09.303-2.26.478-3.473.478-3.978 0-7.365-2.73-8.293-6.44L1.24 15.166C3.198 19.118 7.27 21.815 12 21.815c3.055 0 5.771-1.14 7.91-3.007l-3.87-4.795Z"
                />
                <path
                  fill="#4285F4"
                  d="M19.91 21c3.155-2.545 5.09-6.39 5.09-10.815 0-.727-.064-1.454-.19-2.182H12v4.364h7.118c-.318 1.645-1.254 3.036-2.618 3.936l3.41 4.697Z"
                />
                <path
                  fill="#34A853"
                  d="M5.266 14.235A7.077 7.077 0 0 1 4.909 12c0-.78.132-1.53.375-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.455 3.736 1.257 5.35l4.009-3.115Z"
                />
              </svg>
              Sign in with Google
            </a>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] flex-1 bg-gray-300"></div>
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">or email</span>
            <div className="h-[1px] flex-1 bg-gray-300"></div>
          </div>

          <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-3">
            <div className="relative group">
              <input
                type="text"
                {...loginRegister("email")}
                placeholder="Email address"
                required
                className="w-full h-12 bg-white border border-gray-300 rounded-xl px-4 text-gray-900 placeholder-gray-500 focus:border-[#9466FF] focus:ring-1 focus:ring-[#9466FF] transition-all outline-none"
              />
              {loginErrors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{loginErrors.email.message}</p>
              )}
            </div>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                {...loginRegister("password")}
                placeholder="Password"
                required
                className="w-full h-12 bg-white border border-gray-300 rounded-xl px-4 pr-12 text-gray-900 placeholder-gray-500 focus:border-[#9466FF] focus:ring-1 focus:ring-[#9466FF] transition-all outline-none"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700" onClick={togglePassword}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              {loginErrors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{loginErrors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoginSubmitting}
              className="w-full h-12 bg-[#9466FF] hover:bg-[#8354f5] text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 flex items-center justify-center transform active:scale-[0.98]"
            >
              {pending || isLoginSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Login"
              )}
            </button>

            <div className="flex flex-col items-center gap-2 pt-2">
              <button
                type="button"
                className="w-full h-12 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center transform active:scale-[0.98]"
                onClick={() => toggleMode(true)}
              >
                Create account
              </button>
              <Link href="/auth/forget-password" prefetch={true} className="text-gray-500 hover:text-gray-800 font-medium text-sm transition-colors mt-1">
                Reset password
              </Link>
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
          <div className="flex flex-col items-center mb-6">
            {/* Logo Placeholder */}
            <div className="w-12 h-12 bg-gradient-to-br from-[#fc3fb4] to-[#9466FF] rounded-2xl mb-2 shadow-xl flex items-center justify-center transform rotate-12">
              <span className="text-white font-black text-xl transform -rotate-12 inline-block">MW</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sign up</h2>
          </div>
          <form onSubmit={handleSignupSubmit(handleSignup)}>
            <div
              className="input-box animation !h-[45px] !mt-3"
              style={{ "--li": 19, "--S": 2 }}
            >
              <input type="text" id="register_username" {...signupRegister("username")} required />
              <label htmlFor="register_username">Username</label>
              <i className="bx bxs-user-rectangle"></i>
              {signupErrors.username && (
                <p className="text-red-500 text-[10px] mt-[-2px] ml-1 absolute bottom-[-14px]">{signupErrors.username.message}</p>
              )}
            </div>
            <div
              className="input-box animation !h-[45px] !mt-3"
              style={{ "--li": 20, "--S": 3 }}
            >
              <input type="email" id="register_email" {...signupRegister("email")} required />
              <label htmlFor="register_email">Email</label>
              <i className="bx bxs-envelope"></i>
              {signupErrors.email && (
                <p className="text-red-500 text-[10px] mt-[-2px] ml-1 absolute bottom-[-14px]">{signupErrors.email.message}</p>
              )}
            </div>
            <div
              className="input-box animation !h-[45px] !mt-3"
              style={{ "--li": 21, "--S": 4 }}
            >
              <input type="text" id="register_phone" {...signupRegister("phone")} required />
              <label htmlFor="register_phone">Phone</label>
              <i className="bx bxs-phone"></i>
              {signupErrors.phone && (
                <p className="text-red-500 text-[10px] mt-[-2px] ml-1 absolute bottom-[-14px]">{signupErrors.phone.message}</p>
              )}
            </div>
            <div
              className="input-box animation !h-[45px] !mt-3"
              style={{ "--li": 22, "--S": 5 }}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="register_password"
                {...signupRegister("password")}
                required
              />
              <label htmlFor="register_password">Password</label>
              <span className="absolute right-[-1px] top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePassword}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              {signupErrors.password && (
                <p className="text-red-500 text-[10px] mt-[-2px] ml-1 absolute bottom-[-14px]">{signupErrors.password.message}</p>
              )}
              {/* <i className="bx bxs-lock-alt"></i> */}
            </div>
            <div
              className="input-box animation !h-[45px] !mt-3"
              style={{ "--li": 23, "--S": 6 }}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="register_confirm_password"
                {...signupRegister("confirmPassword")}
                required
              />
              <label htmlFor="register_confirm_password">
                Confirm Password
              </label>
              <span className="absolute right-[-1px] top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={toggleConfirmPassword}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              {signupErrors.confirmPassword && (
                <p className="text-red-500 text-[10px] mt-[-2px] ml-1 absolute bottom-[-14px]">{signupErrors.confirmPassword.message}</p>
              )}
              {/* <i className="bx bxs-lock"></i> */}
            </div>

            <div
              className="animation !mt-6"
              style={{ "--li": 24, "--S": 7 }}
            >
              <button
                type="submit"
                id="signup_button"
                disabled={isSignupSubmitting}
                className={`uppercase w-full h-12 ${pending || isSignupSubmitting
                  ? "bg-[#9466FF] hover:bg-[#9466FF] cursor-not-allowed"
                  : "bg-[#9466FF] hover:bg-[#8354f5]"
                  } text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 flex items-center justify-center transform active:scale-[0.98]`}
              >
              {pending || isSignupSubmitting ? (
                  <Loader2 className="mx-auto animate-spin" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {/* Registration link */}
            <div
              className="regi-link animation mt-4 text-center text-sm text-gray-600 uppercase"
              style={{ "--li": 25, "--S": 8 }}
            >
              <p>
                Already have an account?{" "}
                <span
                  className="SignInLink text-[#fc3fb4] font-bold hover:underline cursor-pointer"
                  onClick={() => toggleMode(false)}
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
