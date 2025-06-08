'use client'

import Header from "../components/header";
import '../components/style.css';
import Image from "next/image";
import ServiceImage from '../../../public/images/service.avif';
import { useState } from "react";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";

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
      phone: formData.get("phone"),
      order: formData.get("order"),
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
          setModalMessage('✔ Buyurtmangiz muvaffaqiyatli yuborildi. Aloqa uchun rahmat!');
          setShowModal(true)
          form.reset();
        } else {
          setModalMessage('❌ Buyurtmangiz yuborilmadi. Iltimos, qayta urinib koʻring.');
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
      <div>
        <Header />
      </div>

      <div className="max-w-9xl md:max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
        <h1 className="font-bold text-center sm:hidden text-xl">Bizda bepul va ajoyib servis</h1>
        <div className="w-full grid grid-cols-1 items-center lg:grid-cols-2 gap-4">
<div className="flex items-center justify-center">
          <Image className="w-full rounded max-w-[400px] lg:max-w-[600px]" src={ServiceImage} alt="Servis rasm" />
</div>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg md:text-[24px] font-semibold">🛍️ Vaqtingizni tejang – Biz siz uchun tayyorlab qo‘yamiz!</h2>
            <p>Do‘konimizga kelishga vaqtingiz yo‘qmi? Yoki navbat kutishni istamaysizmi? Endi bu muammo emas!</p>
            <p>Bizga oldindan buyurtmangizni yuboring — siz kelgunga qadar biz uni tayyorlab qo‘yamiz:</p>
            <ul className="list-disc list-inside pl-2">
              <li>Tanlagan mahsulotlaringizni tayyorlab qo‘yamiz</li>
              <li>Navbatsiz va tez xizmat</li>
              <li>Qulay va samarali xarid</li>
            </ul>
            <p className="text-sm">🕖 Ish vaqti: Har kuni 07:00 – 00:00</p>
            <p className="text-sm font-semibold">Pastdagi forma orqali servis buyurtmalarni amalga oshiring!</p>
          </div>

             <form onSubmit={handleSubmit} className="md:bg-gray-100 w-[100%] md:w-[500px] h-[100%] md:p-6 rounded space-y-4">
            <h3 className="text-lg font-bold">📦 Buyurtma berish</h3>

            <input
              type="text"
              name="fullName"
              placeholder="Ismingiz"
              required
              className="w-full p-2 border rounded"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Telefon raqamingiz"
              required
              className="w-full p-2 border rounded"
            />

            <textarea
              name="order"
              placeholder="Buyurtma tafsilotlari, nima buyurtma qilasiz?"
              required
              rows={4}
              className="w-full h-[200px] p-2 border rounded resize-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Yuborish
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
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
};

export default Page;
