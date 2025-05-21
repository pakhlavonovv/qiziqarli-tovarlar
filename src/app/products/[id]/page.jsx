'use client';

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useParams } from "next/navigation";
import { db, doc, getDoc } from "../../../../firebase-products";
import Header from "../../components/header";
import Loading from "../../components/loading";
import Footer from "../../components/footer";
import '../../components/style.css';
import Link from "next/link";

const ProductDetails = ({ params }) => {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dynamicPrice, setDynamicPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter();
  const paramsData = use(params);
  const productId = paramsData.id; 
  useEffect(() => {
    async function fetchProduct() {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true)
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
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      setDynamicPrice(product?.price * newCount); 
      return newCount;
    });
  };

  const handleDecrease = () => {
    setCount((prevCount) => {
      const newCount = prevCount > 1 ? prevCount - 1 : prevCount;
      setDynamicPrice(product?.price * newCount);
      return newCount;
    });
  };

  const handleBuyNow = async () => {
    const access_token = window.localStorage.getItem('access_token');
    const login = window.localStorage.getItem('login');
  
    if (!product || product.price <= 0) return;
  
    if (access_token || login) {
      router.push(`/payment/${productId}?price=${dynamicPrice}&count=${count}`)
    } else {
      setModalMessage(`Hurmatli foydalanuvchi, mahsulotlarni xarid qilish uchun ro'yxatdan o'ting.`);
      setShowModal(true);
    }
  };
  
  

  const closeModal = () => {
    if (modalMessage.startsWith('Hurmatli')) {
      router.push('/sign-up');
    } else {
      setShowModal(false);
    }
  };

  if (loading) return <Loading />;
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center mb-9 mt-9">
          <h1 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px]">Product Not Found</h1>
          <Link href={'/'} className="w-[150px] h-[35px] flex items-center justify-center bg-black text-white rounded-md">Go to blank page</Link>
        </main>
        <Footer />
      </div>
    );
  }

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
            <h1 className="text-[18px] sm:text-[22px] lg:text-[25px] font-bold">{product.name}</h1>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px]">{product.description}</p>
            <h3 className="text-[14px] lg:text-[16px] font-medium text-gray-700 line-through">{product?.sale || ""}</h3>
            <h2 className="text-[20px] sm:text-[22px] lg:text-[25px] font-bold">{dynamicPrice}</h2>
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
                className="bg-[#f97316] w-[100%] h-[40px] text-[15px] text-white transition-all hover:bg-[#ea580c] rounded-md"
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
      <div className="mt-9 md:mt-[50px] lg:mt-[80px]">
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetails;
