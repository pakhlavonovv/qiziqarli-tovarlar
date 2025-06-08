import Link from 'next/link'
import './style.css'

const Footer = () => {
    return (
        <footer className='w-full bg-[#0f172a] p-4'>
                    <i>
                        <h1 className="container cursor-pointer text-white text-[25px] font-extrabold sm:text-[30px] lg:text-[35px] xl:text-[40px] text-center sm:text-start">Xoji aka</h1>
                    </i>
            <div className="w-[95%] mx-auto grid grid-cols-1 lg:mt-[30px] justify-between gap-5 p-3 sm:grid-cols-2 md:grid-cols-3 md:gap-[100px] lg:gap-[130px] xl:gap-[160px]">
                <div className="flex flex-col gap-1">
                    <Link href={'/login'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Tizimga kirish</Link>
                    <Link href={'/sign-up'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Ro‘xatdan o'tish</Link>
                    <Link href={'/products'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Mahsulotlar</Link>
                </div>
                <div className="flex flex-col gap-1">
                    <Link href={'/'} className='font-bold text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Support</Link>
                    <Link target='_blank' href={'https://t.me/pakhlavonov177'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Telegram qo'llab-quvvatlash</Link>
                </div>
                <div className="flex flex-col gap-1 ">
                    <Link href={'/'} className='font-bold text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Tez havola</Link>
                    <Link href={'/faq'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Tez-tez so'raladigon savollar</Link>
                    <Link href={'/contact'} className='text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] transition-all hover:text-[#88A9C3]'>Bog‘lanish</Link>
                </div>
            </div>
        </footer>

    )
}

export default Footer