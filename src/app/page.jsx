'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "./components/header";
import './components/style.css';
import GoogleIcon from '../../public/images/google.webp';
import Footer from "./components/footer";
import { db } from '../../firebase-config';
import { createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Page = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [loadingButton, setLoadingButton] = useState(false)
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingButton(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await sendEmailVerification(user);
      setModalMessage('😊 A confirmation link has been sent to your email. Please check your email.');
      setShowModal(true);
  
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user.emailVerified) {
          await setDoc(doc(db, 'users', user.uid), {
            firstname,
            lastname,
            email,
            uid: user.uid,
          });
          console.log('User successfully created:', user);
          router.push('/login'); 
        } else {
          setModalMessage('Please verify your email before proceeding.');
          setShowModal(true);
        }
      });
    } catch (error) {
      console.error('Error signing up:', error.message);
  
      if (error.code === 'auth/email-already-in-use') {
        setModalMessage('This email is already in use. Please use a different one.');
      } else {
        setModalMessage('An error occurred during registration.');
      }
      setShowModal(true);
    } finally {
      setLoadingButton(false);
    }
  };
  
  
  const checkVerificationAndCreateUser = async () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.emailVerified) {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            firstname,
            lastname,
            email: user.email,
            uid: user.uid,
          });
          console.log('User data created in Firestore:', user);
          unsubscribe(); 
        } catch (error) {
          console.error('Error creating user data:', error.message);
        }
      }
    });
  };
  useEffect(() => {
    checkVerificationAndCreateUser();
  }, []);

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      await setDoc(doc(db, 'users', user.uid), {
        firstname: user.firstname || user.email,
        lastname: user.lastname || user.email,
        email: user.email,
        uid: user.uid,
      });
  
      setModalMessage('🎉 Congratulations! Your account has been created successfully with Google. Happy shopping at Floxsy!');
      setShowModal(true);
  
      console.log('User signed up with Google:', user);
    } catch (error) {
      console.error('Error signing up with Google:', error.message);
  
      setModalMessage(`An error occurred while signing up with Google: ${error.message}`);
      setShowModal(true);
    }
  };
  

  const closeModal = () => {
    if (modalMessage.startsWith('🎉 Congratulations!')) {
      router.push('/login');
    } else {
      setShowModal(false);
    }
  };
  

  return (
    <div>
      <Header />
      <br className="hidden md:flex" />
      <div className="container flex flex-col items-center justify-center mt-4">
        <h1 className="text-[#112620] text-center text-[20px] sm:text-[25px] md:text-[30px] xl:text-[35px] font-bold">Create Your Account & Start Shopping!</h1>
        <p className="text-[#112620] text-[13px] sm:text-[16px] md:text-[18px] text-center">Sign up now and begin your shopping journey!</p>
        <form onSubmit={handleSubmit} className="w-full mt-3 flex flex-col items-center justify-center gap-2 lg:gap-3">
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required placeholder="Enter your Name" />
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required placeholder="Enter your Surname" />
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your Email" />
          <input className="outline-[#2B4257] p-2 md:p-3 xl:p-4 w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] border-[1px] border-[#091235] rounded-md" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your Password" />
          <button disabled={loadingButton} type="submit" className="bg-[#091235] text-white w-[90%] sm:w-[400px] md:w-[450px] h-[35px] sm:h-[40px] md:h-[45px] text-[12px] sm:text-[15px] lg:text-[17px] rounded-md hover:bg-[#112620]">{loadingButton ? "Creating..." : "Create Account"}</button>
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

      <br /><br /><br /><br />
      <Footer />
    </div>
  );
};

export default Page;
