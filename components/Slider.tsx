"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { slides } from "@/utils";

export const PromoGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setCurrentIndex(prev => {
      // auto slide
      return prev < slides.length - 1 ? prev + 1 : 0;
    })
  },[]);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="hidden md:block w-full relative overflow-hidden min-h-screen">
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative aspect-[16/9]"
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-100">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
              <div className="container mx-auto px-8 max-w-4xl">
                <div className="text-[16px] uppercase tracking-widest text-pink-300 font-medium mb-4">
                  { slide.subtitle || "Premium Collection"}
                </div>
                <h2 className="text-6xl font-bold text-white mb-6">
                  {slide.title}
                </h2>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                  {slide.description}
                </p>
                <Link href={slide.url}>
                  <button className="px-8 py-3 rounded-md font-medium text-white bg-pink-600 hover:bg-pink-700 transition-colors flex items-center gap-2">
                    {slide.btnText}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index
                ? "bg-pink-500"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-sm text-white/80">
        <span className="text-pink-300 font-medium">{currentIndex + 1}</span>
        <span className="mx-1">/</span>
        <span>{slides.length}</span>
      </div>
    </div>
  );
};
