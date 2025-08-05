"use client";

import { useContext, useEffect, useState } from 'react';
import { Sparkles, X, Bot, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WixClientContext } from '@/context/wixContext';

const FeatureIntroModal = () => {

    const { setIsChatWidgetOpen } = useContext(WixClientContext);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const hasSeen = localStorage.getItem('seenAIIntro');
        if (!hasSeen) {
            setTimeout(() => setShowModal(true), 1500); // Delayed appearance
            localStorage.setItem('seenAIIntro', 'true');
        };
    }, []);

    const closeModal = () => {
        setShowModal(false);
        setIsChatWidgetOpen(false);
    };

    const startChatting = () => {
        setIsChatWidgetOpen(true);
        setShowModal(false);
    };

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                >
                    {/* Backdrop with subtle shimmer */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-[#D4AF37]"
                                initial={{
                                    x: Math.random() * 100,
                                    y: Math.random() * 100,
                                    opacity: 0,
                                    scale: 0.5
                                }}
                                animate={{
                                    x: Math.random() * 100,
                                    y: Math.random() * 100,
                                    opacity: [0, 0.8, 0],
                                    scale: [0.5, 1.5, 0.5]
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 6,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: Math.random() * 3
                                }}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                            >
                                <Sparkles size={20} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", damping: 20 }}
                        className="relative w-full max-w-lg bg-gradient-to-br from-[#fff9fb] to-[#fdf2f8] rounded-2xl overflow-hidden shadow-2xl border border-[#f3e8f1]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 text-[#3b1f2b]/70 hover:text-[#3b1f2b] transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={24} />
                        </button>

                        {/* Decorative Elements */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#D4AF37]/10 blur-xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-pink-300/10 blur-xl"></div>

                        {/* Content */}
                        <div className="relative z-10 p-8">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <Bot className="text-[#D4AF37] w-16 h-16" />
                                    <Sparkles className="absolute -top-2 -right-2 text-pink-500 animate-pulse" />
                                </div>
                            </div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl font-bold text-center text-[#3b1f2b] mb-3"
                            >
                                Your Personal <span className="text-[#D4AF37]">Wig AI Stylist</span> is Here!
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-[#3b1f2b]/90 text-center mb-6"
                            >
                                Meet your virtual hair concierge! Our AI agent will help you:
                            </motion.p>

                            <motion.ul
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-3 mb-8"
                            >
                                {[
                                    "🎯 Find your perfect wig match",
                                    "💡 Get styling & care advice",
                                    "🌈 Discover trending colors",
                                    "👑 Recommend products for your face shape",
                                    "✨ Provide 24/7 expert guidance"
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="flex items-start"
                                    >
                                        <span className="mr-2 mt-0.5">•</span>
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
                            >
                                <button
                                    onClick={startChatting}
                                    className="px-6 py-3 bg-[#3b1f2b] hover:bg-[#2a151f] text-white rounded-full font-medium flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                                >
                                    Start Chatting <ChevronRight size={18} />
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FeatureIntroModal;