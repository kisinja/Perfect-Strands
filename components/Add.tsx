"use client";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixCient";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { toast } from "sonner";

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
  const wixClient = useWixClient();
  const [quantity, setQuantity] = useState(1);
  const { isLoading, addItem } = useCartStore();

  const [message, setMessage] = useState<string | null>(null);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-medium uppercase tracking-wider text-[#3b1f2b]">
        SELECT QUANTITY
      </h4>

      <div className="flex flex-col sm:flex-row justify-between gap-6">
        {/* Quantity Selector */}
        <div className="flex items-center gap-6">
          <div className="bg-[#fce7f3] py-3 px-6 rounded-full flex items-center justify-between w-40 border border-[#D4AF37]/30">
            <span
              className={`p-1 rounded-full ${quantity <= 1 ? 'text-[#D4AF37]/30 cursor-default' : 'text-[#D4AF37] hover:bg-[#D4AF37]/10 cursor-pointer'}`}
              onClick={() => {
                if (quantity > 1) {
                  handleQuantity("d");
                } else {
                  setMessage("Minimum quantity is 1");
                }
              }}
            >
              <FiMinus size={18} />
            </span>
            <span className="font-medium text-lg text-[#3b1f2b]">
              {quantity}
            </span>
            <span
              className={`p-1 rounded-full ${quantity >= stockNumber ? 'text-[#D4AF37]/30 cursor-default' : 'text-[#D4AF37] hover:bg-[#D4AF37]/10 cursor-pointer'}`}
              onClick={() => {
                if (quantity < stockNumber) {
                  handleQuantity("i");
                } else {
                  setMessage("Maximum quantity is " + stockNumber);
                }
              }}
            >
              <FiPlus size={18} />
            </span>
          </div>

          {message && (
            <div className="text-sm text-[#3b1f2b]/80">
              {message}
            </div>
          )}

          {/* Stock Indicator */}
          {stockNumber < 1 ? (
            <div className="text-sm text-[#ff4d4d] font-medium">OUT OF STOCK</div>
          ) : (
            <div className="text-sm text-[#3b1f2b]/80">
              <span className="font-medium text-[#D4AF37]">
                {stockNumber} LEFT
              </span> - DON&apos;T MISS OUT
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className={`py-3 px-8 rounded-full font-medium uppercase tracking-wider transition-all duration-300 ${isLoading || stockNumber < 1
            ? 'bg-[#D4AF37]/50 text-white cursor-not-allowed'
            : 'bg-[#D4AF37] hover:bg-[#c5a233] text-white shadow-md hover:shadow-lg'
            }`}
          onClick={() => { addItem(wixClient, productId, variantId, quantity); toast.success("Item added to cart"); }}
          disabled={isLoading || stockNumber < 1}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              ADDING...
            </span>
          ) : (
            'ADD TO CART'
          )}
        </button>
      </div>

      {/* Luxury Note */}
      {stockNumber > 0 && (
        <div className="text-xs text-[#3b1f2b]/60 mt-2 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" strokeWidth="2">
            <path d="M12 2L4 12L12 22L20 12L12 2Z" />
          </svg>
          Premium luxury item - handmade with care
        </div>
      )}
    </div>
  );
};

export default Add;