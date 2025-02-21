'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

function EmailVerification() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [otp, setOtp] = useState('');

    const handleVerify = async () => {
        try {
            const response = await axios.post('/api/verify-email', { email, otp });
            if (response.status === 200) {
                // alert('Email verified successfully!');
                router.push('/login');
            }
        } catch (error) {
            console.error('OTP Verification Failed:', error.response?.data || error.message);
            alert('Invalid OTP. Please try again.');
        }
    };

    return (
        <div className='absolute top-0 bg-green-50 h-screen w-full flex justify-center items-center'>
            <div className='bg-white w-[90%] md:w-[40%] shadow-xl rounded-2xl px-4 py-8'>
                <h2 className='text-center font-bold text-zinc-800 text-2xl'>Verify OTP</h2>
                <hr className='my-4' />
                <div className='flex flex-col gap-4'>
                    <input
                        type='text'
                        maxLength={6}
                        placeholder='Enter OTP'
                        className='px-3 py-2 text-lg font-medium w-full outline-none border rounded-md text-zinc-800 text-center'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                        className='text-white w-full bg-zinc-900 text-lg font-medium py-2'
                        onClick={handleVerify}
                    >
                        Verify OTP
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmailVerification;
