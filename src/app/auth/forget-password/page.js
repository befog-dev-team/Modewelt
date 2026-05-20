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
        <div
            className="h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560780552-ba54683cb263?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlnaHQlMjBncmV5JTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D')" }}
        >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>

            <div className="max-w-md w-full bg-[#ffffff] p-8 rounded-2xl shadow-lg border border-gray-200 relative z-10">
                {/* Error message at the top */}
                {error && (
                    <div className="bg-red-100 text-center text-red-600 p-3 rounded-md text-sm font-medium mb-4">
                        {error}
                    </div>
                )}

                <h1 className="text-[#fc3fb4] font-bold text-center text-2xl mb-6">
                    Reset Your Password
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col">
                        <label className="text-[#fc3fb4] font-semibold mb-1" htmlFor="email">
                            Email ID
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fc3fb4] focus:outline-none transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#fc3fb4] text-white font-medium py-2 rounded-lg hover:bg-[#fc3fb4] transition-all duration-300 shadow-md"
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
