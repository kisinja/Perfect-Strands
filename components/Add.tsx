"use client";
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixCient";
import { useState } from "react";

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

  // Temporary
  //const stock = 4;

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32 ">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left! <br /> Dont{"'"}t miss it
            </div>
          )}
        </div>
        <button
          className="w-36 text-sm rounded-3xl ring-1 ring-[#D4AF37] text-[#D4AF37] py-2 px-4 hover:bg-[#D4AF37] hover:text-white disabled:cursor-not-allowed disabled:bg-[#D4AF37]/80 disabled:text-white disabled:ring-none"
          onClick={() => addItem(wixClient, productId, variantId, quantity)}
          disabled={isLoading || stockNumber < 1}
        >
          {isLoading ? "Adding..." : "Add to cart"}
        </button>
      </div>
    </div>
  );
};

export default Add;
