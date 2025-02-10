"use client";

import React, { useState } from 'react';
import axios from 'axios';

export default function ResetForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://modewelt-backend.onrender.com/api/users/forgot-password', { email });
            setMessage(response.data.message);
            setError(''); // clear error
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
            setMessage(''); // clear message
        }
    };

    return (
        <div className='h-[80vh] w-100 flex justify-center items-center'>
            <div className='max-w-[500px] w-full mx-auto bg-[#faf5ff] rounded-lg p-10 shadow-2xl'>
                <h1 className='text-[#944377] font-Gotham font-extrabold text-center text-bold text-2xl py-4'>Input Email to Reset</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset className='flex flex-col gap-3 w-full'>
                        <label className='text-[#944377] font-bold' htmlFor="email">Email ID</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#944377] focus:outline-none"
                            required
                        />
                    </fieldset>
                    <button
                        type='submit'
                        className='bg-[#944377] text-gray-50 rounded-lg p-2 mt-4 w-full '>
                        Submit
                    </button>
                </form>
                {message && <p className='text-green-500'>{message}</p>}
                {error && <p className='text-red-500'>{error}</p>}
            </div>
        </div >
    );
}
