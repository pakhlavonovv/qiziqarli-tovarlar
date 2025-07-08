'use client'
import Link from 'next/link';
import { useState } from 'react';
import './style.css';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full">
      <div className="bg-[#F0F2F5] flex items-center justify-center gap-1 h-[7vh] md:gap-2 p-2">
        <h2 className="text-black text-[9px] text-center min-[490px]:text-[11px] md:text-[13px] xl:text-[15px]">
       🛍️ O'zbekiston hududidagi eng yaxshi va hamyonbop mahsulotlar
        </h2>
        <Link
          href={'./products'}
          className="text-[9px] font-bold text-[#e63946] min-[490px]:text-[11px] md:text-[13px] xl:text-[15px] underline"
        >
          Buyurtma qilish
        </Link>
      </div>

      <header className="container flex items-center justify-between relative">
        <i>
        <Link href={'/'} className="text-[#F5613F] text-[26px] cursor-pointer font-extrabold sm:text-[30px] lg:text-[42px]">Qiziqarli tovarlar</Link>
        </i>

        <ul className="hidden min-[1029px]:flex items-center gap-3">
          <li>
            <Link className="font-semibold text-[#2C2F44] transition-all hover:text-[#050505]" href={'/'}>
              Asosiy sahifa
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-[#2C2F44] transition-all hover:text-[#050505]" href={'/contact'}>
              Bog‘lanish
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-[#2C2F44] transition-all hover:text-[#050505]" href={'/sign-up'}>
            Ro'yxatdan o'tish
            </Link>
          </li>
        </ul>

        <aside className="flex items-center gap-2 min-[1029px]:hidden">
          <Link href={'/login'} className='text-[14px] sm:text-[16px]'>Kirish</Link>
          <button onClick={toggleSidebar}>
            <i className="fa-solid fa-bars fa-xl"></i>
          </button>
        </aside>

        <Link
          href={'/login'}
          className="hidden min-[1029px]:flex items-center justify-center bg-[#F5613F] text-white w-[150px] h-[40px] rounded-md border-[1px] border-[#F5613F] transition-all hover:bg-transparent hover:text-[#F5613F]"
        >
          Tizimga kirish
        </Link>

        <div
          className={`fixed top-0 left-0 z-50 w-[65%] h-full bg-[#1B1821] text-white p-4 transform transition-transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button onClick={toggleSidebar} className="absolute top-4 right-4">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <ul className="flex flex-col gap-4 mt-10">
            <li>
              <Link className="text-white text-[12px] sm:text-[14px] hover:text-gray-300" href={'/'}>
                Asosiy sahifa
              </Link>
            </li>
            <li>
              <Link className="text-white text-[12px] sm:text-[14px] hover:text-gray-300" href={'/contact'}>
                Bog'lanish
              </Link>
            </li>
            <li>
              <Link className="text-white text-[12px] sm:text-[14px] hover:text-gray-300" href={'/sign-up'}>
                Ro'yxatdan o'tish
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
