import { Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <>
    <div className='bg-black w-full px-10 py-4 text-white grid grid-cols-1 gap-3 md:grid-cols-3'>
        <div className='flex items-center justify-center'><h2 className='font-bold text-2xl merienda'>Sharda Bakers</h2></div>
        <div>
            <h4 className='text-lg font-semibold'>Links</h4>
            <div className='flex gap-4'>
                <Link href={'/'}>Shop</Link>
                <p>|</p>
                <Link href={'/'}>About</Link>
                <p>|</p>
                <Link href={'/'}>Contact</Link>
                <p>|</p>
                <Link href={'/'}>Privacy Policy</Link>
            </div>
        </div>
        <div>
            <h4 className='text-lg font-semibold'>Social Media</h4>
            <div className='flex gap-4'>
            <Link href={'/'}>Instagram</Link>
                <p>|</p>
                <Link href={'/'}>Facebook</Link>
                <p>|</p>
                <Link href={'/'}>Youtube</Link>
            </div>
        </div>
    </div>
    <div className='bg-black text-white p-4'>
        <p className='text-center font-medium text-sm'>Copyright © 2020 - 2025 Sharda Bakers. All Rights Reserved.</p>
    </div>
    </>
  )
}

export default Footer