import { Blog } from "@/.contentlayer/generated";
import { compareDesc, parseISO } from "date-fns";

// Slides data for the homepage carousel
export const slides = [
  {
    id: 1,
    subtitle: "New Arrivals",
    title: "It's Time to Sparkle & Shine",
    description: "Premium wigs for your radiant transformation",
    img: "https://i.pinimg.com/736x/15/98/b1/1598b1d31a677f739bd602c7efb998c8.jpg", // Woman with beautiful blonde wig
    url: "/shop?name=new-arrivals",
    bg: "bg-gradient-to-r from-[#f9f5e8] to-[#f5e9d5]",
    btnText: "SHOP NOW",
    btnStyle:
      "bg-[#D4AF37] hover:bg-[#c59e2f] text-white uppercase tracking-wider",
  },
  {
    id: 2,
    subtitle: "Luxury Collection",
    title: "Sleek New Styles",
    description: "Discover our most luxurious wigs yet",
    img: "https://i.pinimg.com/1200x/8f/f4/76/8ff476ab622b821b51f28081f465a465.jpg", // Elegant woman with dark wig
    url: "/shop?name=new-collection",
    bg: "bg-gradient-to-r from-[#fff0f5] to-[#f8e8ee]",
    btnText: "EXPLORE",
    btnStyle:
      "bg-[#D4AF37] hover:bg-[#c59e2f] text-white uppercase tracking-wider",
  },
  {
    id: 3,
    subtitle: "Customer Favorites",
    title: "Best Sellers",
    description: "Our customers' most loved styles",
    img: "https://i.pinimg.com/1200x/0c/ba/13/0cba1320b1dcbf6fa9fa29cc12f42967.jpg", // Woman with long blonde wig
    url: "/shop?name=bestsellers",
    bg: "bg-gradient-to-r from-[#f5f3ff] to-[#eae4ff]",
    btnText: "SHOP BESTSELLERS",
    btnStyle:
      "bg-[#D4AF37] hover:bg-[#c59e2f] text-white uppercase tracking-wider",
  },
  {
    id: 4,
    subtitle: "Limited Time",
    title: "Special Offer",
    description: "Get 20% off on select premium wigs",
    img: "https://i.pinimg.com/1200x/c0/de/9f/c0de9f98c10aea2605f88c774c69f93f.jpg", // Woman with curly wig smiling
    url: "/shop?name=sale",
    bg: "bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe]",
    btnText: "SHOP SALE",
    btnStyle:
      "bg-[#D4AF37] hover:bg-[#c59e2f] text-white uppercase tracking-wider",
  },
  {
    id: 5,
    subtitle: "Trending Now",
    title: "Natural Look",
    description: "Undetectable lace front wigs for flawless beauty",
    img: "https://i.pinimg.com/736x/61/fe/24/61fe24438aca97749cce3d4045e004db.jpg", // Woman with elegant updo
    url: "/shop?name=natural-look",
    bg: "bg-gradient-to-r from-[#f0fdf4] to-[#dcfce7]",
    btnText: "VIEW STYLES",
    btnStyle:
      "bg-[#D4AF37] hover:bg-[#c59e2f] text-white uppercase tracking-wider",
  },
];

// Utility function to format price
export const formatPrice = (
  value: number,
  currency: string = "KES",
  locale: string = "en-US"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Utility function to join class names conditionally
export const cx = (
  ...classNames: (string | undefined | null | false)[]
): string => classNames.filter(Boolean).join(" ");

// Utility function to sort blogs by publish date in descending order
export const sortBlogs = (blogs: Blog[]) => {
  return blogs
    .slice()
    .sort((a, b) => compareDesc(parseISO(a.publishAt), parseISO(b.publishAt)));
};

// Insights
export const insights = [
  "50,000+ products Sold 👑.",
  "99% Client Satisfaction. ",
  "We offer a 30-day return policy, so you can shop with confidence. ✅",
  "Proudly Black-owned—celebrating diversity in textures, lengths, and styles ✊🏿.",
  "Join our community of satisfied customers and experience the Perfect Strands difference. 💖",
  "We ship worldwide with fast, reliable delivery options to get your perfect wig to you quickly 🌍.",
];