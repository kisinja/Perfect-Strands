export const slides = [
  {
    id: 1,
    title: "It's Time to Sparkle & Shine",
    description: "Premium wigs for your radiant transformation",
    img: "https://images.unsplash.com/photo-1629805484751-2a3d9ee04def?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGh1bWFuJTIwaGFpciUyMHdpZ3N8ZW58MHx8MHx8fDA%3D", // Gold sparkle background
    url: "/shop?name=new-arrivals",
    bg: "bg-gradient-to-r from-[#f9f5e8] to-[#f5e9d5]", // Cream to warm beige
    btnText: "SHOP NOW",
    btnStyle:
      "bg-[#D4AF37] hover:bg-[#c59e2f] text-white uppercase tracking-wider",
  },
  {
    id: 2,
    title: "Sleep New Collection",
    description: "Discover our most luxurious wigs yet",
    img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1920&q=80", // Woman with elegant updo
    url: "/shop?name=new-collection",
    bg: "bg-gradient-to-r from-[#fff0f5] to-[#f8e8ee]", // Blush pink gradient
    btnText: "EXPLORE",
    btnStyle:
      "bg-[#D4AF37] hover:bg-[#c59e2f] text-white uppercase tracking-wider",
  },
  {
    id: 3,
    title: "Best Sellers",
    description: "Our customers' most loved styles",
    img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1920&q=80", // Woman with beautiful curls
    url: "/shop?name=bestsellers",
    bg: "bg-gradient-to-r from-[#f5f3ff] to-[#eae4ff]", // Soft lavender gradient
    btnText: "SHOP BESTSELLERS",
    btnStyle:
      "bg-[#D4AF37] hover:bg-[#c59e2f] text-white uppercase tracking-wider",
  },
  {
    id: 4,
    title: "Special Offer",
    description: "Limited time discount on select styles",
    img: "https://images.unsplash.com/photo-1554721299-e0b8aa7666ce?auto=format&fit=crop&w=1920&q=80", // Woman with long blonde wig
    url: "/shop?name=sale",
    bg: "bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe]", // Light blue gradient
    btnText: "SHOP SALE",
    btnStyle:
      "bg-[#D4AF37] hover:bg-[#c59e2f] text-white uppercase tracking-wider",
  },
];

export const formatPrice = (
  value: number,
  currency: string = "KES",
  locale: string = "en-US"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
