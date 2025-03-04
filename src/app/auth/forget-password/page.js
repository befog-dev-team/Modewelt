"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error on new submission
        setMessage("");

        try {
            const response = await axios.post("/api/auth/forgot-password", { email });
            toast.success(response.data.message);
            setMessage(response.data.message);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200 relative">
                {/* Error message at the top */}
                {error && (
                    <div className="bg-red-100 text-center text-red-600 p-3 rounded-md text-sm font-medium mb-4">
                        {error}
                    </div>
                )}

                <h1 className="text-[#944377] font-bold text-center text-2xl mb-6">
                    Reset Your Password
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col">
                        <label className="text-[#944377] font-semibold mb-1" htmlFor="email">
                            Email ID
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#944377] focus:outline-none transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#944377] text-white font-medium py-2 rounded-lg hover:bg-[#7c3360] transition-all duration-300 shadow-md"
                    >
                        Send Reset Link
                    </button>
                </form>

                {/* Success message */}
                {message && (
                    <p className="text-green-600 text-sm text-center mt-4 font-medium">{message}</p>
                )}
            </div>
        </div>
    );
}
