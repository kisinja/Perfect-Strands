import Link from "next/link";
import { FaInstagram, FaTiktok, FaPinterest } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdOutlineLocalShipping, MdOutlinePayment } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 pb-8 border-t border-[#D4AF37]/20 px-6 md:px-12 lg:px-20">
      {/* Premium Services Banner */}
      <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 py-6 mb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <MdOutlineLocalShipping className="text-3xl text-[#D4AF37] mb-2" />
            <h4 className="font-medium">Free Shipping</h4>
            <p className="text-xs text-gray-400">On orders over KES 40,000</p>
          </div>
          <div className="flex flex-col items-center">
            <RiCustomerService2Fill className="text-3xl text-[#D4AF37] mb-2" />
            <h4 className="font-medium">24/7 Support</h4>
            <p className="text-xs text-gray-400">Wig experts available</p>
          </div>
          <div className="flex flex-col items-center">
            <MdOutlinePayment className="text-3xl text-[#D4AF37] mb-2" />
            <h4 className="font-medium">Secure Payment</h4>
            <p className="text-xs text-gray-400">100% protected</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-playfair text-[#D4AF37]">
            Perfect Strands
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Luxury human hair wigs crafted for queens who demand perfection.
            Established 2023.
          </p>
          <div className="flex space-x-4 text-lg pt-2">
            <a
              href="https://www.instagram.com/perfect_strands.ke/profilecard/?igsh=MW0ydjcxZDU5YjN4Mw=="
              target="_blank"
              className="hover:text-[#D4AF37] transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@perfect_strands.ke?_t=ZM-8vvODE3yeZR&_r=1"
              target="_blank"
              className="hover:text-[#D4AF37] transition-colors duration-300"
            >
              <FaTiktok />
            </a>
            <a
              href="#"
              className="hover:text-[#D4AF37] transition-colors duration-300"
              target="_blank"
            >
              <FaPinterest />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-5 pb-2 border-b border-[#D4AF37]/30 text-[#D4AF37]">
            Explore
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Shop All Wigs", href: "/shop" },
              { name: "Lace Front Wigs", href: "/shop?name=lace-front" },
              { name: "Human Hair", href: "/shop?name=human-hair" },
              { name: "Custom Orders", href: "/" },
              { name: "Wig Care", href: "/" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold mb-5 pb-2 border-b border-[#D4AF37]/30 text-[#D4AF37]">
            Customer Care
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Contact Us", href: "/contact" },
              { name: "FAQs", href: "/faqs" },
              { name: "Shipping Policy", href: "/shipping" },
              { name: "Returns & Exchanges", href: "/returns" },
              { name: "Privacy Policy", href: "/privacy" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-5 pb-2 border-b border-[#D4AF37]/30 text-[#D4AF37]">
              Get Updates
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe for exclusive offers, styling tips, and new arrivals.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-sm text-sm focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#c5a233] text-black font-medium py-2 px-4 rounded-sm text-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex flex-col  justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold text-[#D4AF37] mb-3 flex items-center">
                <FaShieldAlt className="mr-2" size={22} />
                SECURE PAYMENTS
              </h3>
              <div className="relative w-full max-w-[180px]">
                <Image
                  src="/mpesaLogo.png"
                  alt="MPESA Payment"
                  width={180} // Intrinsic width of the image
                  height={80} // Intrinsic height of the image
                  className="object-contain w-full h-auto" // Maintains aspect ratio
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-[#333] text-center">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-2 md:space-y-0">
          <div>
            © {new Date().getFullYear()} Perfect Strands, by{" "}
            <span className="underline hover:text-[#D4AF37]">
              <a href="https://instagram.com/404elvisnotfound" target="_blank">
                lvs.gk
              </a>
            </span>{" "}
            All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link
              href="/terms"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
