'use client'
import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../components/style.css'
const faqs = [
    {
        question: "Saytning asosiy maqsadi nima?",
        answer: "Saytimiz orqali siz qulay, uy rozg‘orlarini amalga o‘shirishingiz va ishonchli tarzda xarid qilishingiz mumkin. Mahsulotlar sifatli va bevosita manzilingizgacha yetkaziladi.",
    },
    {
        question: "Qanday to‘lov usullari mavjud?",
        answer: "Biz Payme orqali to‘lovlarni qabul qilamiz. Bu xavfsiz va qulay to‘lov tizimi hisoblanadi.",
    },
    {
        question: "Yetkazib berish qancha vaqt oladi?",
        answer: "Yetkazib berish odatda 20-40 minut. Agar sizning manzilingiz uzoqda bo‘lsa, bu jarayon 1 soatgacha cho‘zilishi mumkin.",
    },
    {
        question: "Yetkazib berish narxi qanday hisoblanadi?",
        answer: "Yetkazib berish narxi sizning joylashuvingiz va buyurtmangiz hajmiga qarab belgilanadi. Aniq narx to‘lov paytida ko‘rsatiladi.",
    },
    {
        question: "Agar to‘lov paytida manzilni noto‘g‘ri kiritgan bo‘lsam, nima qilishim kerak?",
        answer: "Agar manzilni xato kiritgan bo‘lsangiz, iltimos, zudlik bilan biz bilan bog‘laning — +998999717117 manzili orqali yoki **bog‘lanish sahifasi** orqali murojaat qiling. Yarim soat ichida yozsangiz, muammoni hal qilishimiz osonroq bo‘ladi.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <>
            <div className="mb-5">
                <Header />
            </div>
            <div className="container">
                <h1 className="text-[18px] sm:text-[24px] md:text-[26px] lg:text-[30px] xl:text-[35px] font-bold text-center mb-6">Frequently Asked Questions</h1>
                <div className="space-y-2 sm:space-y-3 md:space-y-4 flex flex-col items-center justify-center">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] border rounded-lg overflow-hidden shadow-sm"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
                            >
                                <span className="text-[12px] sm:text-[14px] md:text-[16px] font-medium">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 transform ${openIndex === index ? "rotate-180" : ""
                                        } transition-transform`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {openIndex === index && (
                                <div className="p-4 text-[12px] sm:text-[14px] md:text-[16px] bg-white border-t">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <Footer />
            </div>
        </>
    );
};

export default FAQ;
