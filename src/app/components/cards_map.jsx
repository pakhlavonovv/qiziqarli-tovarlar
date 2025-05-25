'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../../../firebase-products';
import './style.css';
import Link from 'next/link';
import LoadingCards from './loading_cards'

const CardsMap = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const [error, setError] = useState("");

  const handleRefresh = () => {
    window.location.reload();
  }; 

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
        if (productList.length === 0) {
          throw new Error("No products found!");
        }
        setProducts(productList)  ;
      } catch (error) {
        console.log(error);
        if (error.code === "unavailable") {
          alert("Internet aloqasi yo'q yoki Backend ulanmayapti!");
        } else {
          setError("Maʼlumotlarni yuklashda xatolik yuz berdi!");
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProducts();
  }, []);
  return (
    <div className="w-[97%] mx-auto px-4">
      <h1 className="text-[20px] text-center sm:text-start font-bold sm:text-[25px] lg:text-[30px] mb-8">
        Mahsulotlar
      </h1>
      {error && (
        <div className="text-[#935F4C] px-4 py-3 rounded relative mb-4 text-center flex flex-col items-center justify-center">
          <p className='text-[18px] sm:text-[20px] md:text-[20px] lg:text-[22px] xl:text-[24px]'>{error} Iltimos, sahifani yangilang</p>
          <button
            onClick={handleRefresh}
            className="mt-2 h-[30px] text-[14px] bg-[#2B4257] text-white flex gap-2 items-center justify-center px-8 py-3 sm:px-10 sm:py-4 sm:text-[14px] md:px-12 md:py-5 md:text-[18px] rounded-md hover:bg-gray-500 transition"
          >
            <i className="fa-solid fa-arrow-rotate-right"></i>
            <span>Yangilash</span>
          </button>
        </div>
      )}     {loading ? (
  <div>
    <LoadingCards />
  </div>
) : (
  <div className="grid grid-cols-2 gap-1 sm:gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 relative">
    {products.map((product) => (
      <Link key={product.id} href={`/products/${product.id}`}>
        <div className="w-full h-full flex flex-col justify-between rounded-lg hover:cursor-pointer group relative hover:shadow-md">
          <div className="rounded-lg h-[200px] sm:h-[250px] overflow-hidden">
            <Image
              className={`object-contain w-full h-full rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out ${loadingImage ? "opacity-0" : "opacity-100"
                }`} src={product.image}
              priority
              width={400}
              height={500}
              onLoad={()=> setLoadingImage(false)}
              alt={product.name}
            />
          </div>
          <div className="flex flex-col gap-4 justify-between p-4">
            <h2 className="text-[14px] sm:text-[16px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
              {product.name}
            </h2>
            <div className="flex justify-between items-center">
              <h2 className="text-[14px] sm:text-[16px] font-medium text-gray-700 line-through">
                {product?.sale || ""}
              </h2>
              <h3 className="font-bold text-[16px] sm:text-[18px] text-gray-900">
                {product.price}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
)}

    </div>
  );
};

export default CardsMap;
