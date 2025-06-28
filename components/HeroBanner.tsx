"use client";

import Image from "next/image";
import React from "react";
import { ChevronDown, Sparkle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroBanner: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-screen max-h-[90vh] overflow-hidden block md:hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero-wig-premium.jpeg"
          alt="Luxury wigs from Perfect Strands"
          fill
          priority
          className="object-cover object-center scale-110"
          quality={100}
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Glitter Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[lightPink]/80"
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
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <Sparkle size={16} />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        {/* Title */}
        <motion.h1
          className="text-5xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[lightPink] block text-6xl mb-4 tracking-wider font-playfair-display">
            Perfect Strands
          </span>
          <span className="font-light text-2xl">
            Your <span className="italic font-medium">Crown</span> Awaits
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-white/90 text-xl max-w-2xl mb-10 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Handcrafted luxury wigs for the modern queen. 100% virgin human hair, ethically sourced.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/shop">
            <button className="bg-[lightPink] hover:bg-[lightPink]/80 text-white px-6 py-3 rounded-full font-semibold transition">
              Discover Collection
            </button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <ChevronDown className="text-white h-8 w-8" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroBanner;