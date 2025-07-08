"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import Loading from '../components/loading'
import '../components/style.css';
import GoogleIcon from '../../../public/images/google.webp';
import { auth, db1 } from '../../../firebase-config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [isValid, setIsValid] = useState(false); 
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const providerGoogle = new GoogleAuthProvider();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); 
    if (password.length < 6) {
      setModalMessage("Parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      setShowModal(true);
      setLoading(false); 
      return;
    }
    const access_token = window.localStorage.getItem("access_token");
    if (!access_token) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setModalMessage("🎉 Siz roʻyxatdan oʻtdingiz. Doʻkonimizda aqlli va qulay xaridlarni tanlang!");
        const user = userCredential.user;
        const access_token = await user.getIdToken();  

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('firstname', firstname);
        localStorage.setItem('lastname', lastname);
        localStorage.setItem('login', email);
        setShowModal(true);
        await setDoc(doc(db1, 'users', user.uid), {
          firstname,
          lastname,
          email,
          uid: user.uid,
        });
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setModalMessage('Bu email allaqachon ishlatilmoqda. Iltimos, boshqasini sinab koring.');
        } else {
          setModalMessage('Hisob yaratib bo‘lmadi. Iltimos, qayta urinib koʻring.');
        }
        setShowModal(true);
      } finally {
        setLoading(false); 
      }
    } else {
      setModalMessage('Hisob allaqachon mavjud. Iltimos, tizimga kiring.');
      setShowModal(true);
      setLoading(false); 
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true); 
    const access_token = window.localStorage.getItem('access_token');
    if (!access_token) {
      try {
        const result = await signInWithPopup(auth, providerGoogle);
        setModalMessage("🎉 Siz Google bilan muvaffaqiyatli roʻyxatdan oʻtdingiz. Xoji aka da aqlli va qulay xaridlarni tanlang!");
        const user = result.user;
        const access_token = await user.getIdToken();  
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('email', user.email);
        setShowModal(true);
        await setDoc(doc(db1, 'users', user.uid), {
          firstname: user.displayName?.split(" ")[0] || '',
          lastname: user.displayName?.split(" ")[1] || '',
          email: user.email,
          uid: user.uid,
        });        
      } catch (error) {
        console.error('Google roʻyxatdan oʻtishda xatolik yuz berdi:', error);
        setModalMessage('Google bilan roʻyxatdan oʻtib boʻlmadi yoki siz allaqachon tizimga kirgansiz.');
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    } else {
      setModalMessage('Hisob allaqachon mavjud. Iltimos, tizimga kiring.');
      setShowModal(true);
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (modalMessage.startsWith("🎉 Siz roʻyxatdan oʻtdingiz")) {
      router.push('/');
    } else if (modalMessage.startsWith("Hisob allaqachon mavjud.")) {
      router.push('/');
    } else {
      setShowModal(false);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.endsWith("@gmail.com")) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div>
      <Header />
      <br className="hidden md:flex" />
      <div className="container flex flex-col items-center justify-center mt-4">
        <h1 className="text-[#112620] text-center text-[20px] sm:text-[25px] md:text-[30px] xl:text-[35px] font-bold">Hisob qaydnomangizni yarating va xaridni boshlang!</h1>
        <p className="text-[#112620] text-[13px] sm:text-[16px] md:text-[18px] text-center">Hoziroq ro'yxatdan o'ting va xarid sayohatingizni boshlang!</p>
        {loading ? (
          <Loading/>
        ) : (
          <form onSubmit={handleSignUp} className="w-full mt-3 flex flex-col items-center justify-center gap-2 lg:gap-3">
            <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required placeholder="Ismingizni kiriting" />
            <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required placeholder="Familiyangizni kiriting" />
            <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="email" value={email} onChange={handleEmailChange} required placeholder="Emailingizni kiriting" />
            <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Parolingizni kiriting" />
            <button type="submit" disabled={!isValid} className="bg-[#091235] text-white w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] rounded-md hover:bg-[#112620]">Sign Up</button>
          </form>
        )}
        <button onClick={handleGoogleSignUp} disabled className="mt-2 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] flex items-center justify-center gap-1 text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md bg-transparent">
          <Image className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" src={GoogleIcon} alt="Google icon" />
          Google bilan ro'yxatdan o'tish
        </button>
      </div>
      {!isValid ? <p className="mt-2 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] text-center text-red-600">Sizning loginingiz @gmail.com bilan tugashi kerak</p> : null}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] sm:w-96">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 text-xl">×</button>
            <p className="text-center text-[14px] sm:text-[16px] lg:text-[18px] text-gray-800">{modalMessage}</p>
            <button onClick={closeModal} className="mt-4 w-full bg-red-500 text-[14px] sm:text-[16px] lg:text-[18px] text-white py-2 rounded-md transition-all hover:bg-[#935F4C]">Close</button>
          </div>
        </div>
      )}
      <br /><br /><br className="hidden md:flex"/>
      <Footer />
    </div>
  );
};

export default Page;
