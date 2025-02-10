"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const router = useRouter(); // For navigation
  const [resettoken, setResetToken] = useState('');
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (resetToken) {
      setResetToken(resetToken);
    }
  }, [resetToken]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Simulating a password reset process
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Password reset successful!");
      router.push("/auth"); // Redirect to login page
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg p-6 bg-[#faf5ff] shadow-2xl rounded-lg">
        <h1 className="text-3xl font-bold text-[#944377] mb-6 text-center">Reset Password</h1>
        <p className="text-[#944377] mb-8 text-center">
          Your reset token: <span className="text-blue-600 break-all">{resettoken}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-[#944377] font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#944377] focus:outline-none"
              placeholder="Enter your new password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-[#944377] font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#944377] focus:outline-none"
              placeholder="Confirm your new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#944377] text-white py-3 px-4 rounded-md transition-all"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
