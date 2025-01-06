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
      <div className="bg-[#050505] flex items-center justify-center gap-1 h-[7vh] md:gap-2 p-2">
        <h2 className="text-white text-[9px] text-center min-[490px]:text-[11px] md:text-[13px] xl:text-[15px]">
          Top-Quality Products at Great Prices – Fast Delivery Service Available!
        </h2>
        <Link
          href={'/'}
          className="text-[9px] font-bold text-[#88A9C3] min-[490px]:text-[11px] md:text-[13px] xl:text-[15px] underline"
        >
          Shop now!
        </Link>
      </div>

      <header className="container flex items-center justify-between relative">
        <i>
        <h1 className="text-[#2C2F44] text-[25px] font-extrabold sm:text-[30px] md:text-[40px]">Floxsy</h1>
        </i>

        <ul className="hidden md:flex items-center gap-3">
          <li>
            <Link className="font-semibold text-[#2C2F44] transition-all hover:text-[#050505]" href={'/'}>
              Home
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-[#2C2F44] transition-all hover:text-[#050505]" href={'/'}>
              Contact
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-[#2C2F44] transition-all hover:text-[#050505]" href={'/'}>
              About us
            </Link>
          </li>
          <li>
            <Link className="font-semibold text-[#2C2F44] transition-all hover:text-[#050505]" href={'/'}>
              Sign Up
            </Link>
          </li>
        </ul>

        <aside className="flex items-center gap-2 md:hidden">
          <button onClick={toggleSidebar}>
            <i className="fa-solid fa-bars sm:text-[20px]"></i>
          </button>
          <Link href={'/'}><i className="fa-regular fa-user sm:text-[20px]"></i></Link>
        </aside>

        <Link
          href={'/'}
          className="hidden md:flex items-center justify-center bg-[#2C2F44] text-white w-[140px] h-[40px] rounded-md border-[1px] border-[#2C2F44] transition-all hover:bg-transparent hover:text-[#2C2F44]"
        >
          Log in
        </Link>

        <div
          className={`fixed top-0 left-0 w-[65%] h-full bg-[#1B1821] text-white p-4 transform transition-transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button onClick={toggleSidebar} className="absolute top-4 right-4">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <ul className="flex flex-col gap-4 mt-10">
            <li>
              <Link className="text-white text-[12px] sm:text-[14px] hover:text-gray-300" href={'/'}>
                Home
              </Link>
            </li>
            <li>
              <Link className="text-white text-[12px] sm:text-[14px] hover:text-gray-300" href={'/'}>
                Contact
              </Link>
            </li>
            <li>
              <Link className="text-white text-[12px] sm:text-[14px] hover:text-gray-300" href={'/'}>
                About us
              </Link>
            </li>
            <li>
              <Link className="text-white text-[12px] sm:text-[14px] hover:text-gray-300" href={'/'}>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <hr className="mt-2 hidden md:flex"/>
    </div>
  );
};

export default Header;
