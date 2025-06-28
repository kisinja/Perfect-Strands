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
  FaGem
} from "react-icons/fa";

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessMessage("Your message has been sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to send message. Please try again.");
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
    <section className="bg-[#fff0f5]/30 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#3b1f2b] mb-4 uppercase tracking-wider">
            CONTACT US
          </h1>
          <p className="text-lg text-[#3b1f2b]/80 max-w-2xl mx-auto">
            We&apos;d love to hear from you! Reach out with questions or feedback.
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Contact Information */}
          <div className="lg:w-2/5 space-y-6">
            <div className="bg-white p-8 rounded-xl border border-[#D4AF37]/20 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <FaCrown className="text-[#D4AF37] text-xl" />
                <h2 className="text-2xl font-bold text-[#3b1f2b] uppercase tracking-wider">
                  CONTACT INFO
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4AF37] p-3 rounded-full text-white flex-shrink-0">
                    <FaPhone size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3b1f2b] text-sm uppercase tracking-wider">
                      PHONE / WHATSAPP
                    </h3>
                    <p className="text-[#3b1f2b]/90">+254 710 669 868</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#D4AF37] p-3 rounded-full text-white flex-shrink-0">
                    <FaEnvelope size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3b1f2b] text-sm uppercase tracking-wider">
                      EMAIL
                    </h3>
                    <p className="text-[#3b1f2b]/90">Coming Soon</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#D4AF37] p-3 rounded-full text-white flex-shrink-0">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3b1f2b] text-sm uppercase tracking-wider">
                      ADDRESS
                    </h3>
                    <p className="text-[#3b1f2b]/90">
                      Toll Estate<br />
                      Ruiru, Kenya
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-[#D4AF37]/20 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <FaGem className="text-[#D4AF37] text-xl" />
                <h2 className="text-2xl font-bold text-[#3b1f2b] uppercase tracking-wider">
                  BUSINESS HOURS
                </h2>
              </div>

              <ul className="space-y-4">
                <li className="flex justify-between pb-3 border-b border-[#D4AF37]/10">
                  <span className="text-[#3b1f2b] font-medium">Weekdays</span>
                  <span className="text-[#3b1f2b]/80">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between pb-3 border-b border-[#D4AF37]/10">
                  <span className="text-[#3b1f2b] font-medium">Saturday</span>
                  <span className="text-[#3b1f2b]/80">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#3b1f2b] font-medium">Sunday</span>
                  <span className="text-[#3b1f2b]/80">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-3/5 bg-white p-8 rounded-xl border border-[#D4AF37]/20 shadow-lg h-max">
            <h2 className="text-2xl font-bold text-[#3b1f2b] mb-6 uppercase tracking-wider">
              SEND US A MESSAGE
            </h2>

            {errorMessage && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded mb-6">
                <p className="font-medium">{errorMessage}</p>
              </div>
            )}

            {successMessage && (
              <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded mb-6">
                <p className="font-medium">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-[#3b1f2b] mb-2 uppercase tracking-wider"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-[#3b1f2b] mb-2 uppercase tracking-wider"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-[#3b1f2b] mb-2 uppercase tracking-wider"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition bg-white"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#D4AF37] hover:bg-[#c5a233] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2"
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
                    SENDING...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    SEND MESSAGE
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;