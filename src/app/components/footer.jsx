import Link from 'next/link'
import './style.css'

const Footer = () => {
    return (
        <footer className='w-full bg-[#050505] p-4'>
                    <i>
                        <h1 className="container cursor-pointer text-white text-[25px] font-extrabold sm:text-[30px] lg:text-[35px] xl:text-[40px] text-center sm:text-start">Floxsy</h1>
                    </i>
            <div className="w-[95%] mx-auto grid grid-cols-1 lg:mt-[30px] justify-between gap-5 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-[100px] lg:gap-[130px] xl:gap-[160px]">
                <div className="flex flex-col gap-1">
                    <Link href={'/'} className='font-bold text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Subscribe</Link>
                    <Link href={'/'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Get 10% of your first order</Link>
                    <Link href={'/login'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Login</Link>
                    <Link href={'/sign-up'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Register</Link>
                    <Link href={'/'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Shop</Link>
                </div>
                <div className="flex flex-col gap-1">
                    <Link href={'/'} className='font-bold text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Support</Link>
                    <Link target='_blank' href={'mailto:floxsystore@gmail.com'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>floxsystore@gmail.com</Link>
                    <Link target='_blank' href={'https://t.me/pakhlavonov177'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Telegram support</Link>
                    <Link target='_blank' href={'tel:+998907661303'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>+998 (90) 766-13-03</Link>
                </div>
                <div className="flex flex-col gap-1 ">
                    <Link href={'/'} className='font-bold text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Quick Link</Link>
                    <Link href={'/faq'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>FAQ</Link>
                    <Link href={'/contact'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Contact</Link>
                    <Link href={'/shipping-info'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Shipping Information</Link>
                </div>
                <div className="flex flex-col gap-5">
                    <Link href={'/join'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3] font-bold'>Join us!</Link>
                    <div className="flex gap-3">
                   <Link target='_blank' href={'https://www.instagram.com/floxsy.shop/'}> <i className="fa-brands fa-instagram text-white text-[9px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[25px] transition-all hover:text-[#88A9C3] fa-xl"></i></Link>
                    <Link target='_blank' href={'/'}> <i className="fa-brands fa-tiktok text-white text-[9px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[25px] transition-all hover:text-[#88A9C3] fa-xl"></i></Link>
                   <Link target='_blank' href={'https://t.me/floxsy_store'}> <i className="fa-brands fa-telegram text-white text-[9px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[25px] transition-all hover:text-[#88A9C3] fa-xl"></i></Link>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer