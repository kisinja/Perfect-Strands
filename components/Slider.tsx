"use client";
import { slides } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, ChevronRight, ChevronLeft } from "lucide-react";

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0.5
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0.5,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <motion.div
      className="relative h-screen w-full overflow-hidden hidden md:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glitter Particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[lightPink]/60"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0
            }}
            animate={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <Sparkle size={18} />
          </motion.div>
        ))}
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[lightPink]/5 blur-[100px] animate-pulse"></div>
      </div>

      {/* Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`${slides[currentSlide].bg} absolute inset-0 flex items-center justify-center overflow-hidden`}
        >
          <div className="container mx-auto h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 py-12 relative z-10">
            {/* Content */}
            <motion.div
              className="flex flex-col items-start space-y-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="text-xs uppercase tracking-widest text-[lightPink] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {slides[currentSlide].title || "Premium Collection"}
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                className="text-xl text-gray-400 font-light max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Link href={slides[currentSlide].url}>
                  <button
                    className={`${slides[currentSlide].btnStyle} px-8 py-4 rounded-full font-semibold text-lg uppercase tracking-wider transition-all hover:scale-105 flex items-center gap-2 group bg-[lightPink] text-white`}
                  >
                    {slides[currentSlide].btnText}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="relative w-full h-[60vh] lg:h-[80vh]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Image
                src={slides[currentSlide].img}
                alt={slides[currentSlide].title}
                fill
                sizes="(max-width: 100%) 100vw, 50vw"
                className="object-contain object-center"
                priority={currentSlide === 0}
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/10 text-white transition-all hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={32} strokeWidth={1.5} />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/10 text-white transition-all hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight size={32} strokeWidth={1.5} />
      </motion.button>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full relative ${currentSlide === index ? "bg-[lightPink]" : "bg-white/30 hover:bg-white/50"}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {currentSlide === index && (
              <motion.div
                layoutId="activeDot"
                className="absolute inset-0 rounded-full border-2 border-[lightPink]"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-12 right-12 z-10 text-white/70 text-sm">
        <span className="text-[lightPink] font-medium">{currentSlide + 1}</span>
        <span className="mx-1">/</span>
        <span>{slides.length}</span>
      </div>
    </motion.div>
  );
};