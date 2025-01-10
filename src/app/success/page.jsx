// app/success/page.jsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';
import '../components/style.css'
import Link from 'next/link';

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000); 

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
        <div className="mb-5 lg:mb-10">
      <Header />
        </div>
      <div className="container flex items-center justify-center">
  <div className="w-full max-w-md p-4 flex justify-center items-center shadow-lg rounded-lg bg-white">
    <div className="flex flex-col gap-4 items-center text-center">
      <i className="fa-solid fa-check fa-3x lg:fa-4x text-green-500"></i>
      <h1 className="text-[20px] sm:text-[24px] font-bold text-gray-800">Payment Successful!</h1>
      <p className="text-[14px] sm:text-[16px] text-gray-600">
        Your order has been confirmed. You can return to the home page in a few seconds. Until then, check out the information below
      </p>
      <p className='text-[14px] sm:text-[16px] text-gray-600'>We will keep you updated via email until your product arrives! The security of our customers' products is important to us. If you have any questions about the product, please contact us at <Link href={'mailto:abdullokhpakhlavonov@gmail.com'} className='text-green-500'>abdullokhpakhlavonov@gmail.com</Link>.</p>
      <p className='text-[12px] sm:text-[14px] text-gray-600'>Thank you for choosing Floxsy – where quality and customer satisfaction are our top priorities. We'll be with you every step of the way!</p>
    </div>
  </div>
</div>
<div className="mt-14">
<Footer/>

</div>
    </div>
  );
};

export default SuccessPage;
