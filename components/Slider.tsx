"use client";

import { slides } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Handle manual navigation
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
            {/* Slides container */}
            <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className={`${slide.bg} flex-shrink-0 w-full h-full`}>
                        <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 py-8 md:py-0 gap-8 md:gap-0">
                            {/* Text content */}
                            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4 lg:gap-6 xl:gap-8">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800">
                                    {slide.description}
                                </h2>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900">
                                    {slide.title}
                                </h1>
                                <Link href={slide.url} className="mt-4 md:mt-8">
                                    <button className={`${slide.btnStyle} px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-medium transition-all hover:scale-105`}>
                                        {slide.btnText}
                                    </button>
                                </Link>
                            </div>

                            {/* Image */}
                            <div className="flex-1 w-full h-64 md:h-full relative">
                                <Image
                                    src={slide.img}
                                    alt={slide.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover w-full "
                                    priority={currentSlide === 0}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${currentSlide === index
                            ? "bg-gray-800 scale-125"
                            : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};