"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import hero from '@/assets/hero.jpg'
import anniversaryCake from '@/assets/anniversary2.jpg'
import birthdayCake from '@/assets/birthday2.jpg'
import customCake from '@/assets/casual.jpeg'
import ItemCard from './_components/ItemCard'
import { data } from '@/data'
import { client } from '@/sanity/lib/client'

function Home() {
  const [newlyArrived, setNewlyArrived] = useState([])
  // useEffect(() => {
  //   setNewlyArrived(data.slice(0, 4))
  // }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "cake"] | order(_createdAt desc)[0...4]{
          _id,
          name,
          weight,
          "category": categories->title,
          "imageUrl": image.asset->url,
          discountedPrice,
          originalPrice
        }`;
        const result = await client.fetch(query);
        setNewlyArrived(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  console.log(newlyArrived)

  return (
    <div className='bg-red-950 bg-opacity-10 min-h-screen px-4 md:px-10 pb-10'>
      <div className='bg-white rounded-3xl h-[40vh] lg:h-[80vh] w-full overflow-hidden shadow-md relative' >
        <Image src={hero} alt='hero-img' className='w-full h-full object-center relative z-0' />
        <div className='text-white absolute z-10 top-10 left-5'>
          <h2 className='text-5xl font-semibold'>HEADLINE</h2>
          <p className='text-2xl font-semibold'>jherth reht trehjth erth re</p>
        </div>
      </div>
      <div>
        <p className='text-3xl font-semibold mt-20 mb-10 border-l-8 pl-2 border-red-950 caveat-brush'>Categories</p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='rounded-3xl bg-white p-6 shadow-md'>
          <div className='w-full aspect-square bg-slate-100 rounded-xl overflow-hidden'>
            <Image src={birthdayCake} alt='cake' className='w-full h-full object-cover' />
          </div>
          <div className='mt-4 text-center'>
            <p className='text-red-950 font-semibold text-xl syne'>Birthday Cakes</p>
          </div>
        </div>
        <div className='rounded-3xl bg-white p-6 shadow-md'>
          <div className='w-full aspect-square bg-slate-100 rounded-xl overflow-hidden'>
            <Image src={anniversaryCake} alt='cake' className='w-full h-full object-cover' />
          </div>
          <div className='mt-4 text-center'>
            <p className='text-red-950 font-semibold text-xl syne'>Anniversary Cakes</p>
          </div>
        </div>
        <div className='rounded-3xl bg-white p-6 shadow-md'>
          <div className='w-full aspect-square bg-slate-100 rounded-xl overflow-hidden'>
            <Image src={customCake} alt='cake' className='w-full h-full object-cover' />
          </div>
          <div className='mt-4 text-center'>
            <p className='text-red-950 font-semibold text-xl syne'>Custom Cakes</p>
          </div>
        </div>

      </div>
      <div>
        <p className='text-3xl font-semibold mt-20 mb-10 border-l-8 pl-2 border-red-950 caveat-brush'>Newly Arrived</p>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8'>
        {newlyArrived?.map((item, index) => (
          <ItemCard key={index} OriginalPrice={item.originalPrice} category={item.category} discountedPrice={item.discountedPrice} image={item.imageUrl} productName={item.name} weight={item.weight} />
        ))}

      </div>
    </div>
  )
}

export default Home