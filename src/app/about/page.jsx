import Image from "next/image"
import Header from "../components/header"
import Footer from "../components/footer"
import AboutImage from '../../../public/images/about.jpg'
import '../components/style.css'
const Page = () => {
  return (
    <>
    <div className="md:mb-[40px]">
    <Header/>
    </div>
    <div className="container flex flex-col gap-4 mt-9 md:gap-6 xl:flex-row xl:gap-8">
    <Image priority className="w-[100%] rounded-md order-2 xl:order-1 md:w-[90%] lg:w-[70%] xl:w-[45%]" src={AboutImage} alt="About image"/>
    <div className="flex flex-col gap-1 order-1 xl:order-2">
    <h1 className="text-[18px] sm:text-[22px] md:text-[24px] lg:text-[28px]">Floxsy About</h1>
    <div className="flex flex-col gap-1 mt-1 sm:mt-3">
    <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]">Purpose of Floxsy - Floxsy is online shopping website. Floxsy is a convenient and reliable online shopping platform for customers. We offer you quality products at affordable prices.</p>
    <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]">Floxsy history - Floxsy was established at the start of 2025 to focus on delivering quality and convenience in online shopping</p>
    <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]">Advantages Floxsy - Wide range of products. Fast delivery.</p>
    <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]">Uniqueness - We provide only quality and reliable products.</p>
    </div>
    </div>
    </div>
    <div className="mt-9 sm:mt-[50px] lg:mt-[80px]">
      <Footer/>
    </div>
    </>
  )
}

export default Page