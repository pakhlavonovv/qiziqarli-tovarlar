import Image from "next/image"
import Header from "./components/header"
import './components/style.css'
import GoogleIcon from '../../public/images/google.webp'
import Footer from "./components/footer"
const Page = () => {
  return (
    <div>
      <Header/>
      <br className="hidden md:flex"/>  
      <div className="container flex flex-col items-center justify-center mt-4">
        <h1 className="text-[#112620] text-center text-[20px] sm:text-[25px] md:text-[30px] xl:text-[35px] font-bold">Create Your Account & Start Shopping!</h1>
        <p className="text-[#112620] text-[13px] sm:text-[16px] md:text-[18px] xl:text-[20px] text-center">Sign up now and begin your shopping journey!</p>
        <form className="w-full mt-3 flex flex-col items-center justify-center gap-2 lg:gap-3">
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="text" required placeholder="Enter your Name"/>
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="text" required placeholder="Enter your Surname"/>
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="email" required placeholder="Enter your Email"/>
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="password" required placeholder="Enter your Password"/>
          <button className="bg-[#091235] text-white w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] rounded-md hover:bg-[#112620]">Create Account</button>
        </form>
        <button className="mt-2 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] flex items-center justify-center gap-1 text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md bg-transparent"><Image className="w-[25px] h-[25px]" src={GoogleIcon} alt="Google icon"></Image>Sign Up with Google</button>
      </div>
      <br /><br /><br /><br />
      <Footer/>
    </div>
   
  )
}

export default Page