import React from "react";
import Image from "next/image";

const PromoBanner = () => {
  return (
    <>
      {/* Desktop Version (hidden on mobile) */}
      <div className="hidden sm:flex bg-[#D4AF37]/50 px-4 justify-between h-64 relative">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="font-semibold text-4xl leading-[48px] text-gray-700">
            Grab up to 50% off on <br /> Selected Products
          </h1>
          <button className="bg-[#D4AF37] text-white px-4 py-2 rounded-3xl mt-4 hover:bg-[#b89c2d] transition duration-200 cursor-pointer">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image
            src="/woman.png"
            alt="category image"
            className="object-contain"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>

      {/* Mobile Version (hidden on desktop) */}
      <div className="sm:hidden bg-[#D4AF37]/50 p-4 flex flex-col items-center h-auto relative mb-4">
        <div className="relative w-full h-40 mb-4">
          <Image
            src="/woman.png"
            alt="category image"
            className="object-contain"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="font-semibold text-2xl leading-[32px] text-gray-700">
            Grab up to 50% off on Selected Products
          </h1>
          <button className="bg-[#D4AF37] text-white px-6 py-2 rounded-3xl hover:bg-[#b89c2d] transition duration-200 cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default PromoBanner;