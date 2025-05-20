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
  FaCalendarAlt,
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

  const btnText = isLoading ? "Sending..." : "Send Message";

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold text-[#3a2e26] mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We&apos;d love to hear from you! Reach out with questions or feedback.
        </p>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 w-full">
        {/* Contact Information - Smaller Width */}
        <div className="lg:w-2/5 space-y-8">
          <div className="bg-[#f9f5f0] p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-light text-[#3a2e26] mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#D4AF37] p-3 rounded-full text-white">
                  <FaPhone size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">
                    Phone / WhatsApp
                  </h3>
                  <p className="text-gray-600">+254 710669868</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#D4AF37] p-3 rounded-full text-white">
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Email</h3>
                  <p className="text-gray-600">Coming Soon❗❗</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#D4AF37] p-3 rounded-full text-white">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700">Address</h3>
                  <p className="text-gray-600">
                    Toll Estate
                    <br />
                    Ruiru, Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f9f5f0] p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-light text-[#3a2e26] mb-4">
              Business Hours
            </h2>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-[#f0e6d6] pb-2 flex-wrap gap-y-2">
                <span className="text-gray-700 flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-600" />
                  Weekdays
                </span>
                <span className="text-gray-600 font-medium">
                  9:00 AM - 6:00 PM
                </span>
              </li>
              <li className="flex justify-between border-b border-[#f0e6d6] pb-2 flex-wrap gap-y-2">
                <span className="text-gray-700 flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-600" />
                  Saturday
                </span>
                <span className="text-gray-600 font-medium">
                  10:00 AM - 4:00 PM
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700 flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-600" />
                  Sunday
                </span>
                <span className="text-gray-600 font-medium">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form - Larger Width */}
        <div className="lg:w-3/5 bg-white p-8 rounded-2xl shadow-lg border border-[#f0e6d6] h-max">
          <h2 className="text-2xl font-bold text-[#3a2e26] mb-6">
            Send Us a Message
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
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
                <span className="inline-block text-sm text-red-600 ml-1">
                  *
                </span>
              </label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
                <span className="inline-block text-sm text-red-600 ml-1">
                  *
                </span>
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Message
                <span className="inline-block text-sm text-red-600 ml-1">
                  *
                </span>
              </label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help you?"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D4AF37] hover:bg-[#c9a42e] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  {btnText}
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
