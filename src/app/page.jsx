"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
import './components/style.css';
import GoogleIcon from '../../public/images/google.webp';
import { auth, db } from '../../firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider, signInWithPopup, PhoneAuthProvider } from 'firebase/auth'; // import PhoneAuthProvider here
import { doc, setDoc } from 'firebase/firestore';

const Page = () => {
  const [otp, setOtp] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [loadingButton, setLoadingButton] = useState(false);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const sendOtp = async () => {
    try {
      if (!phone) {
        setModalMessage('Please enter a valid phone number.');
        setShowModal(true);
        return;
      }
  
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible', 
        callback: (response) => {
          console.log("Recaptcha verified", response);
        },
        'expired-callback': () => {
          console.log("Recaptcha expired");
        },
        appVerificationDisabledForTesting: true,
      }, auth);
  
      const appVerifier = window.recaptchaVerifier;
  
      const confirmationResult = await signInWithPhoneNumber(auth, `+${phone}`, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setIsOtpSent(true);
      setModalMessage('OTP has been sent to your phone.');
      setShowModal(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setModalMessage('Failed to send OTP. Please try again.');
      setShowModal(true);
    }
  };
  
  
  
  const verifyOtp = async () => {
    try {
      if (!otp) {
        setModalMessage('Please enter the OTP.');
        setShowModal(true);
        return;
      }
  
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const result = await auth.signInWithCredential(credential);
      const user = result.user;
  
      await setDoc(doc(db, 'users', user.uid), {
        firstname,
        lastname,
        phone: user.phoneNumber,
        uid: user.uid,
      });
  
      setModalMessage('🎉 Account successfully created.');
      setShowModal(true);
      router.push('/login');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setModalMessage('Invalid OTP. Please try again.');
      setShowModal(true);
    }
  };
  
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstname: firstname || user.displayName || '',
        lastname: lastname || '',
        phone: user.phoneNumber || '',
        email: user.email,
        uid: user.uid,
      });

      setModalMessage('🎉 Signed up successfully with Google!');
      setShowModal(true);
      router.push('/login');
    } catch (error) {
      console.error('Error with Google sign-up:', error);
      setModalMessage('Failed to sign up with Google. Please try again.');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Header />
      <br className="hidden md:flex" />
      <div className="container flex flex-col items-center justify-center mt-4">
        <h1 className="text-[#112620] text-center text-[20px] sm:text-[25px] md:text-[30px] xl:text-[35px] font-bold">Create Your Account & Start Shopping!</h1>
        <p className="text-[#112620] text-[13px] sm:text-[16px] md:text-[18px] text-center">Sign up now and begin your shopping journey!</p>
        <form className="w-full mt-3 flex flex-col items-center justify-center gap-2 lg:gap-3">
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required placeholder="Enter your Name" />
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required placeholder="Enter your Surname" />
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Enter your Phone Number" />
          {isOtpSent && (
            <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="Enter the OTP" />
          )}
          {!isOtpSent ? (
            <button type="button" onClick={sendOtp} className="bg-[#091235] text-white w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] rounded-md hover:bg-[#112620]">Send OTP</button>
          ) : (
            <button type="button" onClick={verifyOtp} className="bg-[#091235] text-white w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] rounded-md hover:bg-[#112620]">Verify OTP</button>
          )}
        </form>
        <button onClick={handleGoogleSignUp} className="mt-2 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] flex items-center justify-center gap-1 text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md bg-transparent">
          <Image className="w-[25px] h-[25px]" src={GoogleIcon} alt="Google icon" />
          Sign Up with Google
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] sm:w-96">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 text-xl">×</button>
            <p className="text-center text-[14px] sm:text-[16px] lg:text-[18px] text-gray-800">{modalMessage}</p>
            <button onClick={closeModal} className="mt-4 w-full bg-red-500 text-[14px] sm:text-[16px] lg:text-[18px] text-white py-2 rounded-md transition-all hover:bg-[#935F4C]">Close</button>
          </div>
        </div>
      )}

      <div id="recaptcha-container"></div>
      <br /><br /><br /><br />
      <Footer />
    </div>
  );
};

export default Page;
