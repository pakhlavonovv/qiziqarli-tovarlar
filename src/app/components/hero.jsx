import React from 'react'
import Supermarket from '../../../public/images/supermarket.webp'
import Image from 'next/image'
import Link from 'next/link'
import './style.css'

const Hero = () => {
  return (
    <section className="bg-white py-16 px-4">
  <div className="w-[97%] md:max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
    <div className="md:w-1/2 text-center md:text-left">
      <h1 className="text-2xl sm:text-[28px] md:text-[32px] font-bold mb-4">Xoji aka do‘koniga xush kelibsiz!</h1>
      <p className="text-[12px] sm:text-[14px] md:text-[16px] text-gray-700 mb-4">Sifatli mahsulotlar, arzon narxlar va tez yetkazib berish.</p>
      <Link href={'/products'} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition">
        Xaridni boshlash
      </Link>
    </div>

    <div className="md:w-1/2 flex items-center justify-center">
      <Image
        src={Supermarket} 
        alt="Xoji aka do‘koni"
        className="w-[100%] sm:w-[500px] xl:w-[600px] h-auto rounded-xl shadow-md"
      />
    </div>
  </div>
</section>

  
  )
}

export default Hero