'use client';

import Image from 'next/image';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const HeroBanner: React.FC = () => {
    return (
        <section className="relative w-full h-screen max-h-[90vh] overflow-hidden">
            {/* Background Image - Replace with your actual wig image */}
            <Image
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" // Suggested: High-res image of model wearing your premium wig
                alt="Luxury human hair wigs from Perfect Strands"
                fill
                priority
                className="object-cover object-center"
                quality={100}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                {/* Main Headline */}
                <h1 className="text-4xl md:text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    <span className="text-[#D4AF37] font-playfair block">Perfect Strands</span>
                    Your Signature <span className="italic">Hair</span> Awaits
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 font-light">
                    Premium 100% human hair wigs crafted for queens who demand perfection
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-4">
                    <Link href="/shop">
                        <button className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 cursor-pointer">
                            Shop Collection
                        </button>
                    </Link>
                    <button className="border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium transition-all">
                        Book Consultation
                    </button>
                </div>

                {/* Scroll Indicator */}
                <Link href="#featured-products">
                    <div className="absolute bottom-8 animate-bounce">
                        <ChevronDown className="text-white h-8 w-8" strokeWidth={1.5} />
                    </div>
                </Link>
            </div>

            {/* Floating Badge */}
            <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="text-white font-medium">
                    <a href="#new-products">New Collection</a>
                </span>
            </div>
        </section>
    );
};

export default HeroBanner;