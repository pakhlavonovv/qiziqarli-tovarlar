'use client'
import Link from "next/link"
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
          setModalMessage('✔ Your message has been sent successfully. Thank you for contacting!');
          setShowModal(true)
          form.reset();
        } else {
          setModalMessage('❌ Failed to send the message. Please try again.');
          setShowModal(true)
        }
      } catch (error) {
        setModalMessage('❗ An error occurred. Please try again.');
        setShowModal(true)
        console.error(error);
      }
    } else {
      setModalMessage('Please register to contact us!')
      setShowModal(true)
    }
  };
  const closeModal = () => {
    if (modalMessage.startsWith('Please register')) { 
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
          <h1 className="text-[14px] text-center sm:text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px]">What problem do you have? Contact us.</h1>
          <Link className="text-[12px] text-[#D6AD60] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]" href={'mailto:abdullokhpakhlavonov@gmail.com'}>abdullokhpakhlavonov@gmail.com</Link>
          <Link className="text-[12px] text-[#D6AD60] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]" href={'tel:+998907661303'}>+998 (90) 766 13-03</Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-1 mt-2 lg:gap-2 md:w-full"
        >
          <h2 className="text-[20px] md:text-[22px] lg:text-[24px]">How Can We Help You?</h2>
          <input
            name="fullName"
            className="w-[90%] md:w-[400px] xl:w-[500px] xl:h-[50px] p-2 border-[1px] border-[#E0D7C7] rounded-sm text-[12px] sm:text-[14px] xl:text-[16px] outline-none"
            type="text"
            placeholder="Enter your full name"
            required
          />
          <input
            name="email"
            className="w-[90%] md:w-[400px] xl:w-[500px] xl:h-[50px] p-2 border-[1px] border-[#E0D7C7] rounded-sm text-[12px] sm:text-[14px] xl:text-[16px] outline-none"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            name="topic"
            className="w-[90%] md:w-[400px] xl:w-[500px] xl:h-[50px] p-2 border-[1px] border-[#E0D7C7] rounded-sm text-[12px] sm:text-[14px] xl:text-[16px] outline-none"
            type="text"
            placeholder="Enter about the topic"
            required
          />
          <textarea
            name="message"
            className="w-[90%] h-[130px] md:w-[400px] xl:w-[500px] xl:h-[180px] resize-none p-2 border-[1px] border-[#E0D7C7] rounded-sm text-[12px] sm:text-[14px] xl:text-[16px] outline-none"
            placeholder="Explain your message fully"
            required
          />
          <button
            type="submit"
            className="bg-[#2C2F44] w-[90%] md:w-[400px] xl:w-[500px] xl:h-[50px] h-[40px] text-white text-[12px] sm:text-[14px] xl:text-[16px] rounded-sm"
          >
            Send a message
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
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mb-5">
        <p className="container text-center text-[10px] sm:text-[12px] md:text-[14px]">Dear User, Floxsy will not ignore your problem and we guarantee that you will get a response within 1-2 days.</p>
      </div>

      <Footer />
    </>
  )
}

export default Page