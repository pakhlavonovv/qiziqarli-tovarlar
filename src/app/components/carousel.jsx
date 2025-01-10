'use client';
import { useEffect, useState } from "react";
import './style.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { text: "All trend products", style: "text-[#EAE7E2] text-[25px] sm:text-[35px] md:text-[40px] lg:text-[45px] xl:text-[50px]" },
    { text: "are", style: "text-[#D0D2DE] text-[25px] sm:text-[35px] md:text-[40px] lg:text-[45px] xl:text-[50px]" },
    { text: "on", style: "text-[#F4EBD0] text-[25px] sm:text-[35px] md:text-[40px] lg:text-[45px] xl:text-[50px]" },
    { text: "Floxsy", style: "text-[#FFFAE5] text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[90px]" }
  ];

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div id="default-carousel" className="relative w-full" data-carousel="slide">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-[60vh]">
          <div className="duration-700 ease-in-out" data-carousel-item>
            <div className="absolute w-full h-full flex items-center justify-center text-[20px] bg-gray-800 text-white text-2xl font-bold">
              <span className={`${slides[currentSlide].style}`}>
                {slides[currentSlide].text}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute z-30 hidden sm:flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-2 h-2 sm:w-4 sm:h-4 rounded-full ${currentSlide === index ? "bg-white" : "bg-gray-400"}`}
              aria-current={currentSlide === index ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              data-carousel-slide-to={index}
            ></button>
          ))}
        </div>

        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-5 sm:w-10 h-10 rounded-full bg-white/30 dark:bg-[#211C1D] group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-2 h-2 sm:w-4 sm:h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-5 sm:w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-2 h-2 sm:w-4 sm:h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
