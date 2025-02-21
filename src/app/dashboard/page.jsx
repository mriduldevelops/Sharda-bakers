'use client'
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';
import React from 'react'

function Dashboard() {
    const { isLoggedIn, logout } = useAuth();
    return (
        <div className='min-h-screen'>Dashboard
            <button className='bg-red-950 rounded-md font-semibold text-white px-5 py-1 flex items-center gap-1' onClick={logout}>Logout <LogOut size={18} strokeWidth={3} /></button>
        </div>
    )
}

export default Dashboard