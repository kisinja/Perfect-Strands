"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Home, UserRound, Phone } from "lucide-react";
import { useState } from "react";
import SearchInput from "./SearchInput";
import CartModal from "./CartModal";
import NavProfile from "./NavProfile";
import { useCartStore } from "@/hooks/useCartStore";

const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Shop', href: '/shop', icon: ShoppingBag },
    { name: 'About', href: '/about', icon: UserRound },
    { name: 'Contact', href: '/contact', icon: Phone },
];

const Navbar = () => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false); // Replace with actual cart state
    const softGold = "#D4AF37";

    const { counter } = useCartStore();

    return (
        <nav className="w-full h-[65px] border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto ">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="text-xl font-playfair">
                        Perfect Strands
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm flex items-center gap-1 pb-1 transition-all duration-200 ${isActive ? 'border-b-2' : 'border-b-2 border-transparent hover:border-b-2'} font-medium`}
                                    style={{
                                        borderColor: isActive ? softGold : 'transparent',
                                        color: isActive ? softGold : '#333',
                                    }}
                                >
                                    {/* <Icon size={18} className="mr-1" /> */}
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

                            {/* Profile Icon */}
                            <NavProfile />


                            <div className="relative">
                                <div className="relative p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer active:bg-white">
                                    <ShoppingBag size={22} style={{ color: softGold }} onClick={() => setIsCartOpen(!isCartOpen)} />
                                    <span
                                        className="absolute -top-1 -right-1 bg-red-400 flex items-center justify-center text-white text-xs font-bold rounded-full h-5 w-5 "
                                    >
                                        {counter}
                                    </span>
                                </div>

                                {
                                    isCartOpen && (
                                        <CartModal onClose={() => setIsCartOpen(false)} />
                                    )
                                }
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
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-4 py-3">
                        <SearchInput />
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const Icon = link.icon;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${isActive ? 'bg-opacity-10' : 'hover:bg-opacity-5'}`}
                                    style={{
                                        backgroundColor: isActive ? `${softGold}20` : 'transparent',
                                        color: isActive ? softGold : '#333',
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