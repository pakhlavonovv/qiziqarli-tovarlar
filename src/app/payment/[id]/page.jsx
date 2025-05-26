'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { db1 } from "../../../../firebase-config";
import { db } from "../../../../firebase-products";
import { collection, addDoc, doc, getDoc, Timestamp } from "firebase/firestore";
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Loading from "../../components/loading";
import Link from "next/link";

const PaymentPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [phone, setPhone] = useState("");
    const [receipt, setReceipt] = useState(null);
    const [receiptLoading, setReceiptLoading] = useState(false)
    const searchParams = useSearchParams();
    const dynamicPrice = searchParams.get('price');
    const count = searchParams.get('count');
    const router = useRouter()
    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }
        async function fetchProduct() {
            try {
                const docRef = doc(db1, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct(docSnap.data());
                } else {
                    setModalMessage("Ushbu ID bilan hech qanday mahsulot topilmadi");
                    setShowModal(true)
                }
            } catch (error) {
                setModalMessage("Mahsulotni olishda xatolik yuz berdi:", error);
                setShowModal(true)
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');

    const number = input.startsWith('998') ? input.slice(3) : input;
    if (number.length <= 9) {
      setPhone(number);
    }
  };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setReceiptLoading(true)

        const formData = new FormData();
        formData.append("image", file);

        try {
            const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setReceipt(data.data.url);
                setModalMessage("Kvitansiya yuklandi!");
                setShowModal(true)
            } else {
                console.error("Kvitansiya yuklanmadi!");
                setModalMessage("Kvitansiya yuklanmadi!");
                setShowModal(true)
            }
        } catch (error) {
            console.error("Kvitansiyani yuklashda xatolik yuz berdi:", error);
            setModalMessage("Kvitansiyani yuklashda xatolik yuz berdi.");
            setShowModal(true)
        } finally {
            setReceiptLoading(false)
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!receipt) {
            setModalMessage("Toʻlov kvitansiyasini yuklang");
            setShowModal(true)
            return;
        }

        try {
            const orderData = {
                firstName,
                lastName,
                street,
                phone: `+${phone}`,
                receipt,
                createdAt: Timestamp.now(),
                productImage: product.image,
                productName: product.name,
                productCount: count,
                productPrice: dynamicPrice
            };
            const docRef = await addDoc(collection(db, "orders"), orderData);
            setModalMessage("⏱ Buyurtmangiz tekshirilmoqda. Agar to'lov muvaffaqiyatli bo'lsa, buyurtmangiz qabul qilinadi va biz tez orada siz bilan bog'lanamiz!");
            setShowModal(true)
            setFirstName("");
            setLastName("");
            setStreet("");
            setPhone("");
            setReceipt(null);
        } catch (error) {
            console.error("Buyurtmani kiritishda xatolik yuz berdi:", error);
            setModalMessage("Buyurtma yaratib bo‘lmadi. Iltimos, qayta urinib koʻring.");
            setShowModal(true)
        }
    };

    const closeModal = () => {
        if (modalMessage.startsWith('⏱ Buyurtmangiz tekshirilmoqda.')) {
            router.push('/');
        } else {
            setShowModal(false);
        }
    };
    if (loading) return <Loading />;
    if (!product) return <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center mb-9 mt-9">
            <h1 className="text-[22px] sm:text-[25px] md:text-[22px] lg:text-[24px] xl:text-[26px]">Mahsulot topilmadi</h1>
            <Link href={'/'} className="w-[180px] h-[35px] flex items-center justify-center underline rounded-md">Bosh sahifaga o'ting</Link>
        </main>
        <Footer />
    </div>
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto mt-10 flex flex-col items-center">
                <h1 className="text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] font-bold mb-5">To'lov sahifasi</h1>

                <div className="w-[100%] max-w-md bg-white shadow-lg rounded-lg overflow-hidden p-5">
                    <div className="px-3 pt-2 rounded-lg mb-5 text-center">
                        <Image src={product.image} alt={product.name} width={120} height={120} className="mx-auto rounded-lg" />
                        <h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] text-[#2B4257] font-semibold mt-3">{product.name}</h2>
                        <h3 className="text-[14px] font-bold text-[#091235] mt-1">Soni: {count}</h3>
                        <h3 className="text-[14px] font-bold text-[#091235] mt-1">Chegirma: <span className="line-through">{product?.sale || "Chegirma yo'q"}</span></h3>
                        <h3 className="text-lg font-bold text-green-600 mt-1">Narxi: {dynamicPrice} UZS</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Ismingizni kiriting" className="w-full p-2 border rounded-md" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <input type="text" placeholder="Familyangizni kiriting" className="w-full p-2 border rounded-md" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        <input type="text" placeholder="Masalan: Andijon shahri, Bobur ko‘chasi 12-uy" className="w-full p-2 border rounded-md" value={street} onChange={(e) => setStreet(e.target.value)} required />
                         <input
      type="tel"
      placeholder="Phone number"
      className="w-full p-2 border rounded-md"
      value={`+998${phone}`}
      onChange={handleChange}
      required
    />
                        <label>To‘lovni quyidagi karta raqamiga yuboring:</label>
                        <p><strong>9860 0609 0890 0370</strong> <span className="text-[14px]">Mamajanov Shoxruxbek</span></p>
                        <label className="block text-gray-700 font-medium">Toʻlov kvitansiyasini yuklash:</label>
                        <input type="file" className="w-full p-2 border rounded-md" onChange={handleFileChange} accept="image/*,application/pdf" required />

                        <button type="submit" disabled={receiptLoading} className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700">{receiptLoading ? 'Kvitansiya yuklanmoqda...' : "To'lov qilish"}</button>
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
            </main>
            <div className="mt-4">
                <Footer />
            </div>
        </div>
    );
};

export default PaymentPage;
