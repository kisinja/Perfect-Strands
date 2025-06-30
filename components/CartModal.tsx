/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixCient";
import { formatPrice } from "@/utils";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import { Trash } from "lucide-react";

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [cart, wixClient, getCart]);

  if (isLoading) {
    return (
      <div className="text-[#3b1f2b] text-sm flex items-center justify-center h-20">
        <FaSpinner className="mr-2 animate-spin text-[#D4AF37]" />
        Loading your luxury selections...
      </div>
    )
  }

  return (
    <div className="z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-[#fff0f5] shadow-xl flex flex-col z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#D4AF37]/30">
          <h2 className="text-xl font-bold text-[#3b1f2b]">YOUR CART</h2>
          <button
            onClick={onClose}
            className="text-[#3b1f2b] hover:text-[#D4AF37] transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {!cart.lineItems || cart.lineItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div>
              <Image src="/emptyCart.svg" alt="Empty cart" width={200} height={180} />
            </div>
            <h3 className="text-lg font-medium text-[#3b1f2b] mb-2">
              YOUR CART IS EMPTY
            </h3>
            <p className="text-sm text-[#3b1f2b]/70 mb-4">
              Continue shopping to add premium wigs to your cart
            </p>
            <button
              onClick={onClose}
              className="bg-[#D4AF37] hover:bg-[#c5a233] text-white px-6 py-2 rounded-full font-medium"
            >
              SHOP NOW
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 p-6 overflow-y-auto">
              {cart.lineItems.map((item: any) => (
                <div
                  key={item._id}
                  className="flex gap-4 pb-6 mb-6 border-b border-[#D4AF37]/10 last:border-0"
                >
                  {item.image && (
                    <div className="relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={wixMedia.getScaledToFillImageUrl(item.image, 80, 96, {})}
                        alt={item.productName?.original || "Wig"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-[#3b1f2b]">
                        {item.productName?.original}
                      </h3>
                      <div className="font-medium text-[#3b1f2b]">
                        {typeof item.price?.amount === "number" &&
                          formatPrice(item.price.amount * (item.quantity || 1))}
                      </div>
                    </div>
                    <p className="text-xs text-[#3b1f2b]/70">
                      {item.availability?.status}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-[#3b1f2b]/70">
                        Qty: {item.quantity}
                      </span>
                      <span
                        onClick={() => !isLoading && removeItem(wixClient, item._id!)}
                        className={`text-xs ${isLoading ? 'text-[#D4AF37]/50 cursor-not-allowed' : 'text-red-100 hover:text-red-400 cursor-pointer'}`}
                      >
                        <Trash size={16} className="text-red-500" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#D4AF37]/20 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#3b1f2b]">Subtotal</span>
                <span className="font-bold text-[#3b1f2b]">
                  {formatPrice(cart.lineItems.reduce((acc: number, item: any) => acc + (item.price?.amount || 0) * (item.quantity || 1), 0))}
                </span>
              </div>
              <p className="text-xs text-[#3b1f2b]/50 mb-4">
                Shipping and taxes calculated at checkout
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/cart"
                  className="text-center py-3 px-4 rounded-full border border-[#3b1f2b] text-[#3b1f2b] hover:bg-[#3b1f2b] hover:text-white transition-colors"
                  onClick={onClose}
                >
                  VIEW CART
                </Link>
                <Link
                  href="/checkout"
                  className="text-center py-3 px-4 rounded-full bg-[#D4AF37] hover:bg-[#c5a233] text-white font-medium transition-colors"
                  onClick={onClose}
                >
                  CHECKOUT
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;