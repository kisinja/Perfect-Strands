"use client";
import { WixClientContext } from "@/context/wixContext";
import { useCartStore } from "@/hooks/useCartStore";
//import { useWixClient } from "@/hooks/useWixCient";
import { useState, useEffect, useContext } from "react";
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
  const { myWixClient: wixClient } = useContext(WixClientContext);
  const [quantity, setQuantity] = useState(1);
  const { isLoading, addItem } = useCartStore();
  const [message, setMessage] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  // Clear message after timeout
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
      setMessage(null);
    } else if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
      setMessage(null);
    } else {
      setShowMessage(true);
      setMessage(
        type === "d"
          ? "Minimum quantity is 1"
          : `Maximum available quantity is ${stockNumber}`
      );
    }
  };

  const handleAddToCart = async () => {
    try {
      await addItem(wixClient, productId, variantId, quantity);
      toast.success("Added to cart", {
        description: `${quantity} item${quantity > 1 ? 's' : ''} added to your bag`,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to add item", {
          description: "Please try again",
        });
        console.log("Error adding item to cart", error);
      }
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
            <button
              className={`p-1 rounded-full transition-colors ${quantity <= 1
                  ? "text-[#D4AF37]/30 cursor-not-allowed"
                  : "text-[#D4AF37] hover:bg-[#D4AF37]/10 cursor-pointer"
                }`}
              onClick={() => handleQuantity("d")}
              aria-label="Decrease quantity"
            >
              <FiMinus size={18} />
            </button>

            <span className="font-medium text-lg text-[#3b1f2b]">
              {quantity}
            </span>

            <button
              className={`p-1 rounded-full transition-colors ${quantity >= stockNumber
                  ? "text-[#D4AF37]/30 cursor-not-allowed"
                  : "text-[#D4AF37] hover:bg-[#D4AF37]/10 cursor-pointer"
                }`}
              onClick={() => handleQuantity("i")}
              aria-label="Increase quantity"
            >
              <FiPlus size={18} />
            </button>
          </div>

          {/* Stock and Message */}
          <div className="flex flex-col gap-1">
            {showMessage && message && (
              <div className="text-sm text-[#D4AF37] animate-fade-in">
                {message}
              </div>
            )}

            {stockNumber < 1 ? (
              <div className="text-sm text-[#ff4d4d] font-medium">
                OUT OF STOCK
              </div>
            ) : (
              <div className="text-sm text-[#3b1f2b]/80">
                <span className="font-medium text-[#D4AF37]">
                  {stockNumber} IN STOCK
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || stockNumber < 1}
          className={`py-3 px-8 rounded-full font-medium uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${isLoading || stockNumber < 1
              ? "bg-[#D4AF37]/50 text-white cursor-not-allowed"
              : "bg-[#D4AF37] hover:bg-[#c5a233] text-white shadow-md hover:shadow-lg"
            }`}
          aria-label="Add to cart"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              ADDING...
            </>
          ) : (
            "ADD TO CART"
          )}
        </button>
      </div>

      {/* Luxury Note */}
      {stockNumber > 0 && (
        <div className="text-xs text-[#3b1f2b]/60 mt-2 flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#D4AF37"
            stroke="#D4AF37"
            strokeWidth="2"
          >
            <path d="M12 2L4 12L12 22L20 12L12 2Z" />
          </svg>
          Premium luxury item - handmade with care
        </div>
      )}
    </div>
  );
};

export default Add;