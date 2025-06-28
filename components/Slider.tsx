"use client";

import { slides } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <motion.div
      className="relative h-screen w-full overflow-hidden hidden md:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse"></div>
      </div>

      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`${slide.bg} relative flex-shrink-0 w-full h-full flex items-center justify-center overflow-hidden`}
          >
            <div className="container mx-auto h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 py-12 relative z-10">
              <div className="flex flex-col items-start space-y-6 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                  {slide.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {slide.description}
                </p>
                <Link href={slide.url}>
                  <button
                    className={`${slide.btnStyle} px-6 py-3 rounded-full font-semibold uppercase transition-all hover:scale-105`}
                  >
                    {slide.btnText}
                  </button>
                </Link>
              </div>

              <div className="relative w-full h-96 lg:h-[80vh]">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center rounded-xl"
                  priority={currentSlide === 0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full ${currentSlide === index
                ? "bg-primary"
                : "bg-muted-foreground/30 hover:bg-primary/40"
              }`}
          ></button>
        ))}
      </div>
    </motion.div>
  );
};