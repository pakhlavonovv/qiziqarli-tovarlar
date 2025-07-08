'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import '../components/style.css'

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      topic: formData.get("topic"),
      message: formData.get("message"),
    };
    const token = window.localStorage.getItem('access_token')
    const login = window.localStorage.getItem('login')
    if (token && login) {
      try {
        const response = await fetch('/api/sendMessage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setModalMessage('✔ Xabaringiz muvaffaqiyatli yuborildi. Aloqa uchun rahmat!');
          setShowModal(true)
          form.reset();
        } else {
          setModalMessage('❌ Xabar yuborilmadi. Iltimos, qayta urinib koʻring.');
          setShowModal(true)
        }
      } catch (error) {
        setModalMessage('❗ Xatolik yuz berdi. Iltimos, qayta urinib koʻring.');
        setShowModal(true)
        console.error(error);
      }
    } else {
      setModalMessage('Biz bilan bogʻlanish uchun roʻyxatdan oʻting!')
      setShowModal(true)
    }
  };
  const closeModal = () => {
    if (modalMessage.startsWith('Roʻyxatdan oʻting')) { 
      setShowModal(false);
      router.push('/sign-up');
    } else {
      setShowModal(false);
      router.push('/');
    }
  };
  
  return (
    <>
      <div className="mb-5">
        <Header />
      </div>
      <div className="container flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center">
        <div className="flex flex-col items-center justify-center gap-1 lg:items-start lg:w-full">
          <h1 className="text-[14px] text-center sm:text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px]">Sizda qanday muammo bor? Biz bilan bog'lanish.</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-1 mt-2 lg:gap-2 md:w-full"
        >
          <h2 className="text-[20px] md:text-[22px] lg:text-[24px]">Sizga qanday yordam bera olamiz?</h2>
          <input
            name="fullName"
            className="w-[90%] md:w-[400px] xl:w-[500px] xl:h-[50px] p-2 border-[1px] border-[#E0D7C7] rounded-sm text-[12px] sm:text-[14px] xl:text-[16px] outline-none"
            type="text"
            placeholder="Toʻliq ismingizni kiriting"
            required
          />
          <input
            name="email"
            className="w-[90%] md:w-[400px] xl:w-[500px] xl:h-[50px] p-2 border-[1px] border-[#E0D7C7] rounded-sm text-[12px] sm:text-[14px] xl:text-[16px] outline-none"
            type="email"
            placeholder="Elektron pochtangizni kiriting"
            required
          />
          <input
            name="topic"
            className="w-[90%] md:w-[400px] xl:w-[500px] xl:h-[50px] p-2 border-[1px] border-[#E0D7C7] rounded-sm text-[12px] sm:text-[14px] xl:text-[16px] outline-none"
            type="text"
            placeholder="Mavzu haqida kiriting"
            required
          />
          <textarea
            name="message"
            className="w-[90%] h-[130px] md:w-[400px] xl:w-[500px] xl:h-[180px] resize-none p-2 border-[1px] border-[#E0D7C7] rounded-sm text-[12px] sm:text-[14px] xl:text-[16px] outline-none"
            placeholder="Xabaringizni to'liq tushuntiring"
            required
          />
          <button
            type="submit"
            className="bg-[#F5613F] w-[90%] md:w-[400px] xl:w-[500px] xl:h-[50px] h-[40px] text-white text-[12px] sm:text-[14px] xl:text-[16px] rounded-sm hover:bg-[#f5603f9a]"
          >
            Xabarni yuborish
          </button>
        </form>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] sm:w-96">
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 text-xl">
                ×
              </button>
              <p className="text-center text-[14px] sm:text-[16px] lg:text-[18px] text-gray-800">{modalMessage}</p>
              <button
                onClick={closeModal}
                className="mt-4 w-full bg-red-500 text-[12px] sm:text-[16px] lg:text-[18px] text-white py-2 rounded-md transition-all hover:bg-[#935F4C]"
              >
                Yopish
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mb-5">
        <p className="container text-center text-[10px] sm:text-[12px] md:text-[14px]">Hurmatli foydalanuvchi, Do‘konimiz sizning muammoingizni e'tiborsiz qoldirmaydi va sizga 1-2 kun ichida javob olishingizga kafolat beramiz.</p>
      </div>

      <Footer />
    </>
  )
}

export default Page