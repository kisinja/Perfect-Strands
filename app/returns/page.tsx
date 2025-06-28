import Link from "next/link";
import React from "react";
import {
  FaExchangeAlt,
  FaUndo,
  FaBan,
  FaCheckCircle,
  FaShippingFast,
  FaCrown,
} from "react-icons/fa";

const ReturnsPolicy = () => {
  return (
    <div className="bg-[#fff0f5]/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#fff0f5] to-[#fce7f3] py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#3b1f2b] mb-4 uppercase tracking-wider">
            RETURNS & EXCHANGES
          </h1>
          <p className="text-lg text-[#3b1f2b]/80 max-w-2xl mx-auto">
            Our commitment to your satisfaction
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Returns Policy */}
          <div className="bg-white p-8 rounded-xl border border-[#D4AF37]/20 shadow-sm">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mr-6">
                <FaUndo size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#3b1f2b] uppercase tracking-wider">
                RETURNS
              </h2>
            </div>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span className="text-[#3b1f2b]/90">
                  Initiate within <strong className="text-[#3b1f2b]">48 hours</strong> of receipt
                </span>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span className="text-[#3b1f2b]/90">
                  Wig must be in <strong className="text-[#3b1f2b]">original, unworn condition</strong> with tags
                </span>
              </li>
              <li className="flex items-start gap-4">
                <FaShippingFast className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span className="text-[#3b1f2b]/90">
                  Return shipping costs are on the customer unless it&apos;s our error
                </span>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span className="text-[#3b1f2b]/90">
                  Refunds processed within <strong className="text-[#3b1f2b]">7 business days</strong>, minus original shipping
                </span>
              </li>
            </ul>
          </div>

          {/* Exchanges Policy */}
          <div className="bg-white p-8 rounded-xl border border-[#D4AF37]/20 shadow-sm">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mr-6">
                <FaExchangeAlt size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#3b1f2b] uppercase tracking-wider">
                EXCHANGES
              </h2>
            </div>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span className="text-[#3b1f2b]/90">
                  Initiate within <strong className="text-[#3b1f2b]">48 hours</strong> of receipt
                </span>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span className="text-[#3b1f2b]/90">
                  Wig must be in <strong className="text-[#3b1f2b]">original, unworn condition</strong> with tags
                </span>
              </li>
              <li className="flex items-start gap-4">
                <FaShippingFast className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span className="text-[#3b1f2b]/90">
                  Customer covers shipping costs unless it&apos;s our error
                </span>
              </li>
              <li className="flex items-start gap-4">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span className="text-[#3b1f2b]/90">
                  Replacement shipped within <strong className="text-[#3b1f2b]">7 business days</strong> after receiving the original
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Non-Returnable Items */}
        <div className="mt-12 bg-white p-8 rounded-xl border border-[#D4AF37]/20 shadow-sm">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mr-6">
              <FaBan size={24} />
            </div>
            <h2 className="text-2xl font-bold text-[#3b1f2b] uppercase tracking-wider">
              NON-RETURNABLE ITEMS
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#fce7f3]/30 p-6 rounded-lg border border-[#D4AF37]/10">
              <h3 className="font-bold text-[#3b1f2b] mb-3 uppercase text-sm tracking-wider">
                CUSTOM OR ALTERED WIGS
              </h3>
              <p className="text-[#3b1f2b]/80">
                Any wigs that have been customized or altered to your specifications cannot be returned or exchanged.
              </p>
            </div>
            <div className="bg-[#fce7f3]/30 p-6 rounded-lg border border-[#D4AF37]/10">
              <h3 className="font-bold text-[#3b1f2b] mb-3 uppercase text-sm tracking-wider">
                WORN, STYLED, OR DAMAGED WIGS
              </h3>
              <p className="text-[#3b1f2b]/80">
                Wigs that show signs of wear, have been styled, or are damaged cannot be accepted for return or exchange.
              </p>
            </div>
          </div>
        </div>

        {/* Order Confirmation */}
        <div className="mt-12 bg-white p-8 rounded-xl border border-[#D4AF37]/20 shadow-lg">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mr-6">
              <FaCheckCircle size={24} />
            </div>
            <h2 className="text-2xl font-bold text-[#3b1f2b] uppercase tracking-wider">
              ORDER CONFIRMATION
            </h2>
          </div>

          <div className="bg-[#fce7f3]/30 p-6 rounded-lg border border-[#D4AF37]/10">
            <p className="text-[#3b1f2b]/90">
              Once an order is placed and confirmed, it <strong className="text-[#3b1f2b]">cannot be canceled or modified</strong>. Please review your order carefully before completing your purchase.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="flex justify-center mb-6">
            <FaCrown className="text-[#D4AF37] text-3xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#3b1f2b] mb-4 uppercase tracking-wider">
            NEED HELP WITH A RETURN OR EXCHANGE?
          </h3>
          <p className="text-lg text-[#3b1f2b]/80 mb-8 max-w-2xl mx-auto">
            Contact our customer service team for assistance with your return or exchange process.
          </p>
          <Link href="/contact">
            <button className="bg-[#D4AF37] hover:bg-[#c5a233] text-white font-bold py-3 px-10 rounded-full transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg">
              CONTACT SUPPORT
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ReturnsPolicy;