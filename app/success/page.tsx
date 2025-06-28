import React from 'react';
import Link from 'next/link';

const Success = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm py-4 px-6 md:px-12 lg:px-20">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-foreground">PERFECT STRANDS</h1>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className="text-sm font-medium hover:text-primary">HOME</Link>
                        <Link href="/shop" className="text-sm font-medium hover:text-primary">NEW ARRIVALS</Link>
                        <Link href="/shop" className="text-sm font-medium hover:text-primary">SHOP BY</Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-primary">CONTACT</Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center py-12 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className="text-4xl font-bold mt-4 mb-2">Order Confirmed!</h1>
                        <p className="text-lg text-muted-foreground">Thank you for shopping with Perfect Strands</p>
                    </div>

                    <div className="bg-accent rounded-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-4">it&apos;s time to sparkle & shine</h2>
                        <p className="mb-6">Your order has been placed successfully. We&apos;ll send you a confirmation email shortly.</p>
                        <Link
                            href="/shop"
                            className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full inline-block transition-colors"
                        >
                            CONTINUE SHOPPING
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="font-bold mb-2">Order Details</h3>
                            <p className="text-sm text-muted-foreground">Will be sent to your email</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="font-bold mb-2">Shipping Info</h3>
                            <p className="text-sm text-muted-foreground">Processing time: 1-2 business days</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: "Silky Straight", price: "$89.99" },
                                { name: "Curly Queen", price: "$99.99" },
                                { name: "Wave Goddess", price: "$79.99" },
                                { name: "Kinky Twist", price: "$109.99" }
                            ].map((item, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                    <div className="bg-muted h-32 mb-2 rounded"></div>
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-primary font-bold">{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white py-8 px-6 md:px-12 lg:px-20 border-t border-border">
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} PERFECT STRANDS. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Success;