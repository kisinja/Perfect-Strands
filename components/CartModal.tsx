"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixCient";
import { formatPrice } from "@/utils";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [cart, wixClient, getCart]);

  if(isLoading){
    return <div className="text-gray-500 text-sm flex items-center"> <FaSpinner className="mr-2"/> Loading cart...</div>
  }

  return (
    <div className="z-50">
      {/* Overlay on mobile only */}
      <div
        className="md:hidden fixed inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>

      <div
        className="
        fixed md:absolute 
        top-0 md:top-12 
        left-0 md:left-auto 
        right-0 
        w-full md:w-max 
        h-full md:h-auto 
        bg-white 
        p-6 md:p-4 
        shadow-[0_3px_10px_rgb(0,0,0,0.2)] 
        flex flex-col gap-6 
        z-50 overflow-y-auto
      "
      >
        {/* Close button on mobile */}
        <div className="flex justify-between items-center md:hidden">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-600 text-lg">
            ✕
          </button>
        </div>

        {!cart.lineItems ? (
          <div>Cart is Empty</div>
        ) : (
          <>
            <div className="hidden md:block text-xl">Shopping Cart</div>

            {/* LIST */}
            <div className="flex flex-col gap-8 max-h-[400px] overflow-y-auto">
              {cart.lineItems.map((item) => (
                <div className="flex gap-4" key={item._id}>
                  {item.image && (
                    <Image
                      src={wixMedia.getScaledToFillImageUrl(
                        item.image,
                        72,
                        96,
                        {}
                      )}
                      alt=""
                      width={72}
                      height={96}
                      className="object-cover rounded-md"
                    />
                  )}
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <div className="flex items-center justify-between gap-8">
                        <h3 className="font-semibold">
                          {item.productName?.original}
                        </h3>
                        <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                          {item.quantity && item.quantity > 1 && (
                            <div className="text-xs text-green-500">
                              {item.quantity} x{" "}
                            </div>
                          )}
                          {typeof item.price?.amount === "number" &&
                            formatPrice(item.price.amount)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.availability?.status}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Qty. {item.quantity}
                      </span>
                      <span
                        className="text-blue-500"
                        style={{
                          cursor: isLoading ? "not-allowed" : "pointer",
                        }}
                        onClick={() => removeItem(wixClient, item._id!)}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM */}
            <div className="mt-4">
              <p className="text-gray-500 text-sm mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex justify-between text-sm">
                <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                  View Cart
                </button>
                <button
                  className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                  disabled={isLoading}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
