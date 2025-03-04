"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const searchParams = useSearchParams();

    // Extract token from URL
    useEffect(() => {
        setError("");
        const urlToken = searchParams.get("token");
        setToken(urlToken || "");
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("/api/auth/create-password", { token, newPassword });

            if (response.status === 200) {
                toast.success(response.data.message || "Password reset successfully! You can now log in.");
                setSuccess("Password reset successfully! You can now log in.");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while resetting the password.");
            setError(error.response?.data?.message || "An error occurred while resetting the password.");
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200 relative">
                {/* Error message at the top */}
                {error && (
                    <div className="bg-red-100 text-center text-red-600 p-3 rounded-md text-sm font-medium mb-4">
                        {error}
                    </div>
                )}

                <h1 className="text-[#944377] font-bold text-center text-3xl mb-6">
                    Reset Your Password
                </h1>

                {success ? (
                    <div className="text-center">
                        <p className="text-green-600 font-medium">{success}</p>
                        <Link href="/auth" prefetch className="block mt-4 text-[#944377] font-semibold hover:underline">
                            Go to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* New Password Field */}
                        <div className="relative flex flex-col">
                            <label className="text-[#944377] font-semibold mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#944377] focus:outline-none transition pr-12"
                                    required
                                />
                                {/* Eye icon button */}
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-500 hover:text-[#944377] transition-colors duration-300"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative flex flex-col">
                            <label className="text-[#944377] font-semibold mb-2">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#944377] focus:outline-none transition pr-12"
                                    required
                                />
                                {/* Eye icon button */}
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-500 hover:text-[#944377] transition-colors duration-300"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#944377] text-white font-medium py-3 rounded-lg hover:bg-[#7c3360] transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}