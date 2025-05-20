import Image from "next/image";
import React from "react";
import { FaCrown, FaGem, FaAward } from "react-icons/fa";

// Metadata for the About page
export const metadata = {
  title: "About Us | Perfect Strands",
  description:
    "Discover the story behind Perfect Strands, a brand dedicated to empowering ",
};

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#f9f5f0] to-[#f0e6d6] py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-[#3a2e26] mb-6">
              Our Story
            </h1>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative h-96 lg:h-auto">
              <Image
                src="/founder.jpg"
                alt="Founder of Perfect Strands"
                className="object-cover"
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <span className="bg-[#D4AF37] text-white px-4 py-2 rounded-full text-sm font-medium">
                  Founder & CEO
                </span>
              </div>
            </div>

            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mr-4">
                  <FaCrown size={20} />
                </div>
                <h2 className="text-3xl font-playfair text-[#3a2e26]">
                  About Perfect Strands
                </h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At{" "}
                <span className="font-semibold text-[#3a2e26]">
                  Perfect Strands
                </span>
                , we believe every woman deserves to feel like royalty in her
                own crown. Founded by a passionate beauty visionary, our brand
                celebrates the intersection of luxury, individuality, and
                uncompromising quality.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                With our meticulously curated collection of premium wigs and
                extensions, we&apos;ve empowered thousands of women worldwide to
                rediscover their confidence and express their authentic beauty —
                on their own terms.
              </p>

              <div className="mt-8 pt-8 border-t border-[#f0e6d6]">
                <p className="font-medium text-[#3a2e26] italic">
                  &quot;True beauty begins the moment you decide to be
                  yourself.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair text-[#3a2e26] mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide every strand we create
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-[#f9f5f0] p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300">
            <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mx-auto mb-6">
              <FaCrown size={28} />
            </div>
            <h3 className="text-2xl font-playfair text-[#3a2e26] mb-4">
              Empowerment
            </h3>
            <p className="text-gray-600">
              We create products that help women embrace their unique beauty
              with unshakable confidence and self-assurance.
            </p>
          </div>

          <div className="bg-[#f9f5f0] p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300">
            <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mx-auto mb-6">
              <FaGem size={28} />
            </div>
            <h3 className="text-2xl font-playfair text-[#3a2e26] mb-4">
              Elegance
            </h3>
            <p className="text-gray-600">
              Our designs blend timeless sophistication with contemporary trends
              to create effortlessly chic hair solutions.
            </p>
          </div>

          <div className="bg-[#f9f5f0] p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300">
            <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mx-auto mb-6">
              <FaAward size={28} />
            </div>
            <h3 className="text-2xl font-playfair text-[#3a2e26] mb-4">
              Excellence
            </h3>
            <p className="text-gray-600">
              From sourcing premium materials to perfecting every detail, we
              deliver nothing less than exceptional quality.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-[#f0e6d6] py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <h2 className="text-3xl lg:text-4xl font-playfair text-[#3a2e26] mb-8 leading-tight">
            Redefining Beauty Standards Through{" "}
            <br className="hidden lg:block" />
            <span className="text-[#D4AF37]">Authentic Self-Expression</span>
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            At Perfect Strands, we&apos;re more than a hair brand — we&apos;re a
            movement dedicated to celebrating diversity and helping women
            worldwide embrace their natural beauty while exploring
            transformative possibilities.
          </p>
          <button className="bg-[#D4AF37] hover:bg-[#c9a42e] text-white font-medium py-3 px-8 rounded-full transition-all duration-300">
            Discover Our Collections
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
