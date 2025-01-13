'use client'
import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../components/style.css'
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What does your company or business do?",
            answer: "We help you find high-quality products and deliver them directly to your doorstep. Our goal is to provide the best online shopping experience for our customers.",
        },
        {
            question: "What is the purpose of the site?",
            answer: "Our website aims to make online shopping easy and convenient by offering high-quality products delivered directly to your doorstep. We prioritize customer satisfaction and strive to provide a seamless shopping experience.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept payments through Stripe. This ensures a safe and convenient payment process for our customers.",
        },
        {
            question: "How long does delivery take?",
            answer: "Delivery usually takes 3-7 business days depending on your location. But sometimes it may take longer if your address is far from the product and it will take up to 14-18 days.",
        },
        {
            question: "How is the shipping cost calculated?",
            answer: "Shipping costs depend on the destination and the size of your order. The exact amount will be displayed at checkout.",
        },
        {
            question: "What should I do if I entered the wrong address during checkout?",
            answer: "If you entered the wrong address during payment, please contact us immediately - abdulokhpakhlavonov@gmail.com and in any case, write your problem on the contact page. Please let us know within 24 hours if you have any problem with the address otherwise it may be late.",
        },
    ];

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
