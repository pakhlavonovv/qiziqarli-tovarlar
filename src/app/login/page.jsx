'use client'
import { useState } from "react"
import Image from "next/image"
import Header from "../components/header"
import '../components/style.css'
import GoogleIcon from '../../../public/images/google.webp'
import Footer from "../components/footer"
const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = (e) => {
    e.preventDefault()
    console.log('User signed in:', {email, password})
  }
  return (
    <div>
      <Header/>
      <br className="hidden md:flex"/>  
      <div className="container flex flex-col items-center justify-center mt-4">
        <h1 className="text-[#112620] text-center text-[20px] sm:text-[25px] md:text-[30px] xl:text-[35px] font-bold">Welcome Back, Login to Floxsy</h1>
        <p className="text-[#112620] text-[13px] sm:text-[16px] md:text-[18px]  text-center">Access your account and start shopping smarter today!</p>
        <form onSubmit={handleLogin} className="w-full mt-3 flex flex-col items-center justify-center gap-2 lg:gap-3">
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required placeholder="Enter your Email"/>
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required placeholder="Enter your Password"/>
          <button type="submit" className="bg-[#091235] text-white w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] rounded-md hover:bg-[#112620]">Log in</button>
        </form>
        <button className="mt-2 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] flex items-center justify-center gap-1 text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md bg-transparent"><Image className="w-[25px] h-[25px]" src={GoogleIcon} alt="Google icon"></Image>Sign In with Google</button>
      </div>
      <br /><br /><br /><br />
      <Footer/>
    </div>
   
  )
}

export default Page