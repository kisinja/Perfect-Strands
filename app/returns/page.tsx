import Link from "next/link";
import React from "react";
import {
  FaExchangeAlt,
  FaUndo,
  FaBan,
  FaCheckCircle,
  FaShippingFast,
} from "react-icons/fa";

const ReturnsPolicy = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#f9f5f0] to-[#f0e6d6] py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#3a2e26] mb-4">
              Returns & Exchanges Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to your satisfaction
            </p>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Returns Policy */}
          <div className="bg-[#f9f5f0] p-8 rounded-2xl shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mr-4">
                <FaUndo size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#3a2e26]">Returns</h2>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span>
                  Initiate within <strong>48 hours</strong> of receipt
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span>
                  Wig must be in <strong>original, unworn condition</strong>{" "}
                  with tags
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaShippingFast className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span>
                  Return shipping costs are on the customer unless it's our
                  error
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span>
                  Refunds processed within <strong>7 business days</strong>,
                  minus original shipping
                </span>
              </li>
            </ul>
          </div>

          {/* Exchanges Policy */}
          <div className="bg-[#f9f5f0] p-8 rounded-2xl shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mr-4">
                <FaExchangeAlt size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#3a2e26]">Exchanges</h2>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span>
                  Initiate within <strong>48 hours</strong> of receipt
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span>
                  Wig must be in <strong>original, unworn condition</strong>{" "}
                  with tags
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaShippingFast className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span>
                  Customer covers shipping costs unless it's our error
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span>
                  Replacement shipped within <strong>7 business days</strong>{" "}
                  after receiving the original
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Non-Returnable Items */}
        <div className="mt-12 bg-[#f9f5f0] p-8 rounded-2xl shadow-sm">
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mr-4">
              <FaBan size={24} />
            </div>
            <h2 className="text-2xl font-bold text-[#3a2e26]">
              Non-Returnable Items
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-semibold text-[#3a2e26] mb-2">
                Custom or Altered Wigs
              </h3>
              <p className="text-gray-600">
                Any wigs that have been customized or altered to your
                specifications cannot be returned or exchanged.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-semibold text-[#3a2e26] mb-2">
                Worn, Styled, or Damaged Wigs
              </h3>
              <p className="text-gray-600">
                Wigs that show signs of wear, have been styled, or are damaged
                cannot be accepted for return or exchange.
              </p>
            </div>
          </div>
        </div>

        {/* Order Confirmation */}
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg border border-[#f0e6d6]">
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mr-4">
              <FaCheckCircle size={24} />
            </div>
            <h2 className="text-2xl font-bold text-[#3a2e26]">
              Order Confirmation
            </h2>
          </div>

          <div className="bg-[#f9f5f0] p-6 rounded-xl">
            <p className="text-gray-700">
              Once an order is placed and confirmed, it{" "}
              <strong>cannot be canceled or modified</strong>. Please review
              your order carefully before completing your purchase.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-[#3a2e26] mb-4">
            Need Help With a Return or Exchange?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our customer service team for assistance with your return or
            exchange process.
          </p>
          <Link href="/contact">
            <button className="bg-[#D4AF37] hover:bg-[#c9a42e] text-white font-medium py-3 px-8 rounded-full transition-colors duration-300">
              Contact Support
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ReturnsPolicy;
