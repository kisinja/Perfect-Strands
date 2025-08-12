"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Home, UserRound, Phone } from "lucide-react";
import { useState } from "react";
import SearchInput from "./SearchInput";
import CartModal from "./CartModal";
import NavProfile from "./NavProfile";
import { useCartStore } from "@/hooks/useCartStore";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "About", href: "/about", icon: UserRound },
  { name: "Contact", href: "/contact", icon: Phone },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { counter } = useCartStore();

  //const lightPink = "#fff0f5";

  return (
    <nav className="w-full h-[65px] border-b border-pink-200 bg-[lightPink] shadow-sm sticky top-0 z-50 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="w-[100px] h-[60px] relative">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                width={100}
                height={40}
                className="object-contain w-full h-full"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm flex items-center gap-1 pb-1 font-medium transition-all duration-200 ${
                    isActive
                      ? "border-b-2"
                      : "border-b-2 border-[#fff0f5] hover:border-pink-300"
                  }`}
                  style={{
                    borderColor: isActive ? "#fff0f5" : "transparent",
                    color: isActive ? "#ffff" : "#3b1f2b",
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block flex-1">
              <SearchInput />
            </div>

            <div className="flex items-center space-x-4">
              <NavProfile />

              <div className="relative">
                <div
                  className="relative p-2 rounded-full hover:bg-[#fff0f5] transition-colors cursor-pointer text-[#fff0f7]"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <ShoppingBag size={22} />
                  <span className="absolute -top-1 -right-1 bg-red-400 flex items-center justify-center text-white text-xs font-bold rounded-full h-5 w-5">
                    {counter}
                  </span>
                </div>

                {isCartOpen && (
                  <CartModal onClose={() => setIsCartOpen(false)} />
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fff0f5] shadow-lg">
          <div className="px-4 py-3">
            <SearchInput />
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center px-3 py-2 text-base font-medium rounded-md"
                  style={{
                    backgroundColor: isActive ? "#fce7f3" : "transparent",
                    color: isActive ? "#fff0f5" : "#3b1f2b",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} className="mr-3" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;