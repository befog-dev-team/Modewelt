"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function VerifyEmail() {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');

    const verifyEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
            setError(false);
            toast.success('Email Verified Successfully!');
        } catch (error) {
            setError(true);
            console.log(error.message);
            toast.error('Error occurred during email verification. Please try again!');
        }
    };

    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || '');

        // Good Practice for Next.js -->
        // const {query} = router;
        // const urlTokenTwo = query.token
        // setToken(urlTokenTwo || "");

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setError(false);
        if (token.length > 0) {
            verifyEmail();
        }
        // eslint-disable-next-line
    }, [token]);

    console.log(error)

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg w-3/5 md:flex md:flex-row overflow-hidden">
                {/* Left Section */}
                <div className="md:w-1/2 bg-purple-500 text-white p-8 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-4">WELCOME BACK!</h1>
                    <p className="text-sm leading-relaxed">
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry&apso;s standard dummy.
                    </p>
                </div>

                {/* Right Section */}
                <div className="md:w-1/2 bg-white p-8 flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold text-purple-500 mb-6">Verify Your Email</h2>
                    {error.length > 0 && (
                        <div className="mb-4 text-red-500 font-semibold text-lg">Error occurred during email verification. Please try again!</div>
                    )}
                    {verified && (
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-green-500">Email Verified!</h3>
                            <Link href="/auth">
                                <p className="text-purple-500 underline mt-4 block">Proceed to Login</p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
