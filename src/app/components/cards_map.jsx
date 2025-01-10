'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../../../firebase-products';
import './style.css';
import Link from 'next/link';
import Loading from './loading';

const CardsMap = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.log('Productlarni yuklashda xatolik:', error);
      } finally {
        setLoading(false)
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="w-[97%] mx-auto px-4">
      <h1 className="text-[20px] text-center sm:text-start font-bold sm:text-[25px] lg:text-[30px] mb-8">
        2025 Most Popular Products
      </h1>
      <div className="grid grid-cols-2 gap-1 sm:gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <Loading />
          </div>
        ) : (
          products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="w-full h-full flex flex-col justify-between rounded-lg hover:cursor-pointer group relative hover:shadow-md">
                <div className="rounded-lg h-[200px] sm:h-[250px] overflow-hidden">
                  <Image
                    className="object-cover w-full h-full rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    src={product.image}
                    priority
                    width={400}
                    height={500}
                    alt={product.name}
                  />
                </div>
                <div className="flex flex-col gap-4 justify-between p-4">
                  <h2 className="text-[14px] sm:text-[16px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                    {product.name}
                  </h2>
                  <div className="flex justify-between items-center">
                    <h2 className="text-[14px] sm:text-[16px] font-medium text-gray-700 line-through">
                      1000
                    </h2>
                    <h3 className="font-bold text-[16px] sm:text-[18px] text-gray-900">
                      ${product.price}
                    </h3>
                  </div>
                </div>
              </div>

            </Link>
          ))
        )}
      </div>
    </div>



  );
};

export default CardsMap;
