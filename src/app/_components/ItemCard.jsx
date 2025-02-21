import React from 'react'
import { Minus, Plus, ShoppingCart, Star } from 'lucide-react'
// import cakeImg from '@/assets/butterscotch-cake-5.webp'\
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

function ItemCard({ image, productName, category, discountedPrice, OriginalPrice, id, weight = "1kg" }) {
  return (
    <div className='rounded-xl lg:rounded-3xl bg-white p-3 lg:p-6 shadow-md'>
      <div className='rounded-lg lg:rounded-xl bg-slate-100 w-full aspect-square overflow-hidden'>
        <Image src={urlFor(image).url()} alt='cake-img' className='object-cover h-full w-full' width={1000} height={1000} />
      </div>
      <div className='mt-4'>
        <p className='text-xl font-semibold text-red-950 syne line-clamp-1'>{weight} {productName}</p>
        <span className='text-sm text-zinc-700 font-semibold'>{category}</span>
        {/* <div className='flex items-center gap-1'>
        <Star strokeWidth={0} fill='#FFD700' size={20} />
        <Star strokeWidth={0} fill='#FFD700' size={20} />
        <Star strokeWidth={0} fill='#FFD700' size={20} />
        <Star strokeWidth={0} fill='#FFD700' size={20} />
      </div> */}
        <div className='flex gap-4 items-end'>
          <span className='text-base line-through font-semibold text-red-800 my-2'>{`₹${OriginalPrice}`}</span>
          <p className='text-xl font-semibold text-zinc-800 my-2'>{`₹${discountedPrice}`}</p>
        </div>
        <div className='max-w-full w-full flex justify-between'>
          <div className='w-[70%] lg:w-full flex justify-between items-center'>
            <button className='h-8 w-8 bg-red-950 rounded-md lg:rounded-lg text-white grid place-items-center'><Minus /></button>
            <p className='text-xl font-semibold text-zinc-800'>1</p>
            <button className='h-8 w-8 bg-red-950 rounded-md lg:rounded-lg text-white grid place-items-center'><Plus /></button>
          </div>
          <button className='lg:hidden h-8 w-8 bg-red-950 rounded-md lg:rounded-lg text-white grid place-items-center'><ShoppingCart /></button>
        </div>
        <div className='w-full mt-4 hidden lg:block'>
          <button className='h-8 w-full bg-red-950 rounded-lg text-white grid place-items-center'>ADD TO CART</button>
        </div>
      </div>
    </div>
  )
}

export default ItemCard