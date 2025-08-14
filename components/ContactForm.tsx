"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  FaPaperPlane,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCrown,
  FaGem,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessMessage(
        "Your royal message has been received! We'll respond promptly."
      );
      setForm({ name: "", email: "", message: "" });
      setErrorMessage("");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(
          error.message ||
            "The royal courier failed! Please try your message again."
        );
      }
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#fff9fb] to-[#fdf2f8] py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-[#D4AF37] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#3b1f2b] rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <FaCrown className="text-[#D4AF37] mr-3 text-xl" />
            <h1 className="text-4xl lg:text-5xl font-bold text-[#3b1f2b] uppercase tracking-wider ">
              Royal Contact
            </h1>
            <FaCrown className="text-[#D4AF37] ml-3 text-xl" />
          </div>
          <p className="text-lg text-[#3b1f2b]/80 max-w-2xl mx-auto font-medium">
            Your majesty, we await your royal decree. How may we serve you
            today?
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#f5c542] mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Contact Information - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-2/5 space-y-6"
          >
            <div className="bg-white p-8 rounded-2xl border border-[#D4AF37]/20 shadow-lg backdrop-blur-sm bg-opacity-70">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#D4AF37] p-2 rounded-lg">
                  <FaCrown className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-[#3b1f2b] uppercase tracking-wider ">
                  Court Information
                </h2>
              </div>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#fff0f5]/10 transition-all"
                >
                  <div className="bg-[#D4AF37] p-3 rounded-full text-white flex-shrink-0 shadow-md">
                    <FaPhone size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3b1f2b] text-sm uppercase tracking-wider">
                      Business Hotline
                    </h3>
                    <p className="text-[#3b1f2b]/90 mt-1">+254 710 669 868</p>
                    <p className="text-[#D4AF37] text-xs mt-1">
                      Available 24/7 for urgent matters
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#fff0f5]/10 transition-all"
                >
                  <div className="bg-[#D4AF37] p-3 rounded-full text-white flex-shrink-0 shadow-md">
                    <FaEnvelope size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3b1f2b] text-sm uppercase tracking-wider">
                      Business Mail
                    </h3>
                    <p className="text-[#3b1f2b]/90 mt-1">coming soon‼️</p>
                    <p className="text-[#D4AF37] text-xs mt-1">
                      Response within 24 hours
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#fff0f5]/10 transition-all"
                >
                  <div className="bg-[#D4AF37] p-3 rounded-full text-white flex-shrink-0 shadow-md">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3b1f2b] text-sm uppercase tracking-wider">
                      Business Location
                    </h3>
                    <p className="text-[#3b1f2b]/90 mt-1">
                      Toll Estate
                      <br />
                      Ruiru, Kenya
                    </p>
                    <p className="text-[#D4AF37] text-xs mt-1">
                      By appointment only
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#D4AF37]/20 shadow-lg backdrop-blur-sm bg-opacity-70">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#3b1f2b] p-2 rounded-lg">
                  <FaGem className="text-[#D4AF37] text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-[#3b1f2b] uppercase tracking-wider ">
                  Court Hours
                </h2>
              </div>

              <ul className="space-y-4">
                <li className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                  <span className="text-[#3b1f2b] font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
                    Weekdays
                  </span>
                  <span className="text-[#3b1f2b]/80 bg-[#fff0f5] px-3 py-1 rounded-full text-sm">
                    9:00 AM - 6:00 PM
                  </span>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                  <span className="text-[#3b1f2b] font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
                    Saturday
                  </span>
                  <span className="text-[#3b1f2b]/80 bg-[#fff0f5] px-3 py-1 rounded-full text-sm">
                    10:00 AM - 4:00 PM
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-[#3b1f2b] font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#3b1f2b] rounded-full"></span>
                    Sunday
                  </span>
                  <span className="text-[#3b1f2b]/80 bg-[#f3e8f1] px-3 py-1 rounded-full text-sm">
                    Closed
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:w-3/5 bg-white p-8 rounded-2xl border border-[#D4AF37]/20 shadow-xl backdrop-blur-sm bg-opacity-70 h-max"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-[#D4AF37] to-[#f5c542] p-2 rounded-lg">
                <FaPaperPlane className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-[#3b1f2b] uppercase tracking-wider ">
                Send Royal Correspondence
              </h2>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded mb-6"
              >
                <p className="font-medium">{errorMessage}</p>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded mb-6"
              >
                <p className="font-medium">{successMessage}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-[#3b1f2b] mb-2 uppercase tracking-wider"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition bg-white placeholder-[#3b1f2b]/40"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-[#3b1f2b] mb-2 uppercase tracking-wider"
                >
                  Your Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="youremail@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition bg-white placeholder-[#3b1f2b]/40"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-[#3b1f2b] mb-2 uppercase tracking-wider"
                >
                  Tell us something <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Leave us a message..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition bg-white placeholder-[#3b1f2b]/40"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#f5c542] hover:from-[#c5a233] hover:to-[#e5b53b] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
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
                      SENDING MESSAGE...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      SEND MESSAGE
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
