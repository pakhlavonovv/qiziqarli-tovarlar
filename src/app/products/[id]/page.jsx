'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useParams } from "next/navigation"; 
import { db, doc, getDoc } from "../../../../firebase-products/index";
import { loadStripe } from '@stripe/stripe-js';
import Header from "../../components/header";
import Loading from "../../components/loading";
import Footer from "../../components/footer";
import '../../components/style.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const ProductDetails = () => {
  const { id } = useParams(); 
  const [count, setCount] = useState(1); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dynamicPrice, setDynamicPrice] = useState(0); 
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const router = useRouter()

  useEffect(() => {
    async function fetchProduct() {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setProduct(productData);
          setDynamicPrice(productData.price); 
        } else {
          console.log("No product found with this ID in Firebase");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleIncrease = () => {
    setCount(prevCount => prevCount + 1); 
    setDynamicPrice(prevPrice => prevPrice * 2); 
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
      setDynamicPrice(prevPrice => Math.max(prevPrice / 2, product.price)); 
    }
  };

  const handleBuyNow = async () => {
    const access_token = window.localStorage.getItem('access_token')
    const login = window.localStorage.getItem('login')

    if (!product || dynamicPrice <= 0) return;
    if(access_token || login){   
      try {
        const response = await fetch('../../api/checkout_sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: product.name,
            price: dynamicPrice,
            count: count
          }),
        });
  
        const session = await response.json();
  
        if (session.id) {
          const stripe = await stripePromise;
          const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
  
          if (error) {
            console.error('Error during checkout:', error);
          }
        }
      } catch (error) {
        console.error('Error creating checkout session:', error);
      }
    } else {
      setModalMessage('Dear user, Please register to buy products.')
      setShowModal(true)
    }
  };

  const closeModal = () => {
    if (modalMessage.startsWith('Dear')) {
      router.push('/sign-up');
    } else {
      setShowModal(false);
    }
  };

  if (loading) return <div><Loading /></div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <div className="mb-5 md:mb-[40px]">
        <Header />
      </div>
      <div className="container">
        <div className="flex items-center gap-2">
          <span className="text-[12px] sm:text-[14px] md:text-[16px]">Trend Products /</span>
          <span className="text-[12px] sm:text-[14px] md:text-[16px]"> {product.name}</span>
        </div>
        <div className="mt-5 grid grid-cols-1 items-center justify-center gap-5 lg:grid-cols-2 lg:items-center">
          {product.image ? (
            <div className="flex items-center justify-center">
              <Image src={product.image} alt={product.name} width={500} height={500} className="object-contain w-full max-h-[300px] min-[400px]:w-[90%] min-[400px]:max-h-[300px] rounded-md min-[450px]:max-h-[400px] min-[500px]:max-w-[400px] lg:max-w-full lg:max-h-[500px]" priority />
            </div>
          ) : (
            <div>No image available</div>
          )}
          <div className="flex flex-col gap-1">
            <span className="text-[12px] sm:text-[14px] lg:text-[16px]">Model: {product.model}</span>
            <h1 className="text-[18px] sm:text-[22px] lg:text-[25px] font-bold">{product.name}</h1>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px]">{product.description}</p>
            <h3 className="text-[14px] lg:text-[16x] font-medium text-gray-700 line-through">${product.sale}</h3>
            <h2 className="text-[20px] sm:text-[22px] lg:text-[25px] font-bold">${dynamicPrice}</h2>
            <span>Product count: {count}</span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <button
                  className="border-[1px] border-[#2B4257] w-[100%] h-[40px] text-[20px] rounded-md"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <button
                  className="bg-[#2B4257] w-[100%] h-[40px] text-[20px] text-white rounded-md"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
              <button
                className="bg-[#091235] w-[100%] h-[40px] text-[15px] text-white rounded-md"
                onClick={handleBuyNow}
              >
                Buy now
              </button>
            </div>
          </div>
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
                Close and register now
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="mt-9 md:mt-[50px] lg:mt-[100px]">
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetails;
