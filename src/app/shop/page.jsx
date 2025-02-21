"use client"
import React, { useEffect, useState } from 'react'
import ItemCard from '../_components/ItemCard'
import { data } from '@/data'
import { client } from '@/sanity/lib/client'
function Shop() {

  const [products, setProducts] = useState([])
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
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  console.log(products)
  return (
    <div className='p-4 md:p-10 bg-red-950 bg-opacity-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8'>
        {products?.map((item, index) => (
          <ItemCard key={index} OriginalPrice={item.originalPrice} category={item.category} discountedPrice={item.discountedPrice} image={item.imageUrl} productName={item.name} weight={item.weight} />
        ))}

      </div>
    </div>
  )
}

export default Shop