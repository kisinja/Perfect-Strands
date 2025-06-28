import Link from "next/link";
import { FaInstagram, FaTiktok, FaPinterest } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdOutlineLocalShipping, MdOutlinePayment } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#fff0f5] text-[#3b1f2b] pt-12 pb-8 border-t border-[lightPink]/30 px-6 md:px-12 lg:px-20">
      {/* Premium Services Banner */}
      <div className="bg-[#fce7f3] py-8 mb-12 rounded-lg">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <MdOutlineLocalShipping className="text-3xl text-[lightPink] mb-3" />
            <h4 className="font-medium text-lg">Free Shipping</h4>
            <p className="text-sm text-[#3b1f2b]/80">On orders over $100</p>
          </div>
          <div className="flex flex-col items-center">
            <RiCustomerService2Fill className="text-3xl text-[lightPink] mb-3" />
            <h4 className="font-medium text-lg">24/7 Support</h4>
            <p className="text-sm text-[#3b1f2b]/80">Wig experts available</p>
          </div>
          <div className="flex flex-col items-center">
            <MdOutlinePayment className="text-3xl text-[lightPink] mb-3" />
            <h4 className="font-medium text-lg">Secure Payment</h4>
            <p className="text-sm text-[#3b1f2b]/80">100% protected</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-[lightPink]">
            Perfect Strands
          </h2>
          <p className="text-sm text-[#3b1f2b] leading-relaxed">
            Luxury human hair wigs crafted for queens who demand perfection.
          </p>
          <div className="flex space-x-5 text-xl pt-2">
            <a
              href="https://www.instagram.com/perfect_strands.ke/profilecard/?igsh=MW0ydjcxZDU5YjN4Mw=="
              target="_blank"
              className="hover:text-[lightPink] transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@perfect_strands.ke?_t=ZM-8vvODE3yeZR&_r=1"
              target="_blank"
              className="hover:text-[lightPink] transition-colors duration-300"
            >
              <FaTiktok />
            </a>
            <a
              href="#"
              className="hover:text-[lightPink] transition-colors duration-300"
              target="_blank"
            >
              <FaPinterest />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-[lightPink]/30 text-[#3b1f2b]">
            SHOP BY
          </h3>
          <ul className="space-y-3">
            {[
              { name: "New Arrivals", href: "/new-arrivals" },
              { name: "Best Sellers", href: "/best-sellers" },
              { name: "On Sale", href: "/sale" },
              { name: "Gift Ideas", href: "/gifts" },
              { name: "All Wigs", href: "/shop" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-[#3b1f2b] hover:text-[lightPink] transition-colors text-sm font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-[lightPink]/30 text-[#3b1f2b]">
            CUSTOMER CARE
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
                  className="text-[#3b1f2b] hover:text-[lightPink] transition-colors text-sm font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter & Payment */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-[lightPink]/30 text-[#3b1f2b]">
              GET UPDATES
            </h3>
            <p className="text-[#3b1f2b] text-sm mb-4">
              Subscribe for exclusive offers and new arrivals.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-white border border-[lightPink]/30 rounded-sm text-sm focus:outline-none focus:border-[lightPink]"
              />
              <button
                type="submit"
                className="w-full bg-[lightPink] hover:bg-[#c5a233] text-white font-medium py-2 px-4 rounded-sm text-sm transition-colors uppercase tracking-wider"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#3b1f2b] mb-1 flex items-center">
              <FaShieldAlt className="mr-2" size={18} />
              SECURE PAYMENTS
            </h3>
            <div className="relative w-full max-w-[200px]">
              <Image
                src="/mpesaLogo.png"
                alt="MPESA Payment"
                width={200}
                height={80}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-[lightPink]/30 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#3b1f2b]/80 space-y-2 md:space-y-0">
          <div>
            © {new Date().getFullYear()} Perfect Strands. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link
              href="/terms"
              className="hover:text-[lightPink] transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[lightPink] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="hover:text-[lightPink] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;