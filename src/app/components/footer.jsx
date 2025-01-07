import Link from 'next/link'
import './style.css'

const Footer = () => {
    return (
        <footer className='w-full bg-[#050505]'>
                    <i>
                        <h1 className="container text-white text-[25px] font-extrabold sm:text-[30px] text-center sm:text-start">Floxsy</h1>
                    </i>
            <div className="container grid grid-cols-1 items-center justify-between gap-5 p-3 md:p-5 xl:p-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-1">
                    <Link href={'/'} className='font-bold text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Subscribe</Link>
                    <Link href={'/'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Get 10% of your first order</Link>
                </div>
                <div className="flex flex-col gap-1 sm:order-2">
                    <Link href={'/'} className='font-bold text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Support</Link>
                    <Link href={'/'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>abdullokhpakhlavonov@gmail.com</Link>
                    <Link target='_blank' href={'https://t.me/pakhlavonov177'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Telegram support</Link>
                    <Link href={'/'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>+998-90-766-13-03</Link>
                </div>
                <div className="flex flex-col gap-1">
                    <Link href={'/'} className='font-bold text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Account</Link>
                    <Link href={'/account'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>My account</Link>
                    <Link href={'/login'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Login</Link>
                    <Link href={'/register'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Register</Link>
                    <Link href={'/'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Shop</Link>
                </div>
                <div className="flex flex-col gap-1 sm:order-6">
                    <Link href={'/'} className='font-bold text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Quick Link</Link>
                    <Link href={'/faq'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>FAQ</Link>
                    <Link href={'/contact'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Contact</Link>
                    <Link href={'/refund-policy'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Return and Refund Policy</Link>
                    <Link href={'/shipping-info'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Shipping Information</Link>
                    <Link href={'/privacy-policy'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Privacy Policy</Link>
                    <Link href={'/terms-conditions'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px]'>Terms and Conditions</Link>
                </div>
                <div className="flex flex-col gap-5">
                    <Link href={'/'} className='text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] font-bold'>Join us!</Link>
                    <div className="flex gap-3">
                   <Link href={'/'}> <i className="fa-brands fa-instagram text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] fa-xl"></i></Link>
                    <Link href={'/'}><i className="fa-brands fa-facebook text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] fa-xl"></i></Link>
                    <Link href={'/'}> <i className="fa-brands fa-tiktok text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] fa-xl"></i></Link>
                   <Link href={'/'}> <i className="fa-brands fa-telegram text-white text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] fa-xl"></i></Link>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer