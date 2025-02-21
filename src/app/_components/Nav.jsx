"use client"
import { LogOut, Menu, ShoppingCart, UserRound, X } from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'

function Nav() {
    const { isLoggedIn, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle Menu
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Close Menu when clicking outside
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            {/* Navbar */}
            <div className='px-10 lg:px-20 py-4 text-red-950 bg-red-950 bg-opacity-10 flex justify-between items-center relative'>
                {/* Logo */}
                <div>
                    <h3 className='font-bold text-2xl merienda'>Sharda Bakers</h3>
                </div>

                {/* Desktop Links */}
                <div className='md:flex items-center gap-8 text-base font-semibold hidden'>
                    <Link href='/' onClick={closeMenu}>Home</Link>
                    <Link href='/shop' onClick={closeMenu}>Shop</Link>
                    <Link href='/about' onClick={closeMenu}>About</Link>
                    <Link href='/contact' onClick={closeMenu}>Contact</Link>
                </div>

                {/* Icons */}
                <div className='flex gap-8 items-center'>
                    {/* Cart Icon */}
                    <div className='relative'>
                        <Link href='/cart'>
                            <ShoppingCart color='#450a0a' />
                        </Link>
                    </div>

                    {/* User Icon */}
                    <div>
                        {isLoggedIn ? (
                            <Link href='/dashboard'>
                                <UserRound color='#450a0a' />
                            </Link>
                        ) : (
                            <Link href='/login' className='py-2 px-5 rounded-md bg-red-950 text-white font-semibold'>
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div>
                        <Menu color='#450a0a' className='block md:hidden cursor-pointer' onClick={toggleMenu} />
                    </div>
                </div>
            </div>

            {/* Overlay & Slide Menu */}
            {isMenuOpen && (
                <div className='fixed inset-0 z-20'>
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black opacity-50 transition-opacity" onClick={closeMenu}></div>


                </div>
            )}

            {/* Sidebar Menu */}
            <div className={`fixed top-0 right-0 z-30 w-80 h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                {/* Close Button */}
                <div className='flex justify-between items-center mb-6'>
                    <h3 className='text-xl font-bold text-red-950'>Menu</h3>
                    <X className='cursor-pointer' onClick={closeMenu} />
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-6 text-lg font-semibold">
                    <Link href='/' onClick={closeMenu}>Home</Link>
                    <Link href='/shop' onClick={closeMenu}>Shop</Link>
                    <Link href='/about' onClick={closeMenu}>About</Link>
                    <Link href='/contact' onClick={closeMenu}>Contact</Link>
                </nav>
            </div>
        </>
    );
}

export default Nav;
