import Image from "next/image";
import React from "react";
import { FaCrown, FaGem, FaAward } from "react-icons/fa";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "ABOUT US | PERFECT STRANDS",
  description: "Discover the luxury behind Perfect Strands - where every wig is crafted to make you sparkle & shine",
};

const AboutPage = () => {
  return (
    <div className="bg-[#fff0f5]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#fff0f5] to-[#fce7f3] py-28 overflow-hidden mb-[58px]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/sparkle-pattern.png')] bg-repeat opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#3b1f2b] mb-6 uppercase tracking-wider">
            OUR STORY
          </h1>
          <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-xl text-[#3b1f2b]/80 max-w-2xl mx-auto">
            Where luxury meets self-expression
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 -mt-20 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#D4AF37]/20">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative h-96 lg:h-auto">
              <Image
                src="https://ik.imagekit.io/elviskiarie25/founder.jpg?updatedAt=1749073638904"
                alt="Founder of Perfect Strands"
                className="object-cover"
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <span className="bg-[#D4AF37] text-white px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                  <Sparkles /> FOUNDER & CEO
                </span>
              </div>
            </div>

            <div className="lg:w-1/2 p-10 flex flex-col justify-center bg-[#fce7f3]/30">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mr-6">
                  <FaCrown size={24} />
                </div>
                <h2 className="text-3xl font-bold text-[#3b1f2b] uppercase tracking-wider">
                  PERFECT STRANDS
                </h2>
              </div>

              <p className="text-lg text-[#3b1f2b]/90 leading-relaxed mb-6">
                At <span className="font-bold text-[#D4AF37]">PERFECT STRANDS</span>,
                we believe every woman deserves to <span className="font-semibold">sparkle & shine</span>.
                Founded by a passionate beauty visionary, our brand celebrates the
                intersection of luxury, individuality, and uncompromising quality.
              </p>

              <p className="text-lg text-[#3b1f2b]/90 leading-relaxed mb-8">
                With our meticulously curated collection of premium wigs and
                extensions, we&apos;ve empowered thousands of women worldwide to
                rediscover their confidence and express their authentic beauty —
                on their own terms.
              </p>

              <div className="mt-6 pt-6 border-t border-[#D4AF37]/30">
                <p className="font-medium text-[#3b1f2b] italic text-lg">
                  &quot;True beauty begins the moment you decide to be yourself.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#3b1f2b] mb-4 uppercase tracking-wider">
            OUR CORE VALUES
          </h2>
          <p className="text-lg text-[#3b1f2b]/80 max-w-2xl mx-auto">
            The principles that guide every strand we create
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaCrown size={28} />,
              title: "EMPOWERMENT",
              description: "We create products that help women embrace their unique beauty with unshakable confidence and self-assurance."
            },
            {
              icon: <FaGem size={28} />,
              title: "ELEGANCE",
              description: "Our designs blend timeless sophistication with contemporary trends to create effortlessly chic hair solutions."
            },
            {
              icon: <FaAward size={28} />,
              title: "EXCELLENCE",
              description: "From sourcing premium materials to perfecting every detail, we deliver nothing less than exceptional quality."
            }
          ].map((value, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-[#D4AF37]/20 hover:shadow-lg transition-all duration-300 hover:border-[#D4AF37]/40"
            >
              <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mx-auto mb-6">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#3b1f2b] mb-4 uppercase tracking-wider">
                {value.title}
              </h3>
              <p className="text-[#3b1f2b]/80">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gradient-to-r from-[#fff0f5] to-[#fce7f3] py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-8"></div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#3b1f2b] mb-8 leading-tight uppercase tracking-wider">
            REDEFINING BEAUTY STANDARDS <br />
            <span className="text-[#D4AF37]">THROUGH SELF-EXPRESSION</span>
          </h2>
          <p className="text-lg text-[#3b1f2b]/80 mb-10 max-w-3xl mx-auto">
            At Perfect Strands, we&apos;re more than a hair brand — we&apos;re a
            movement dedicated to celebrating diversity and helping women
            worldwide embrace their natural beauty while exploring
            transformative possibilities.
          </p>
          <button className="bg-[#D4AF37] hover:bg-[#c5a233] text-white font-bold py-3 px-10 rounded-full transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg">
            SHOP COLLECTIONS
          </button>
        </div>
      </section>

      {/* Sparkle Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
        <Sparkles className="text-[#D4AF37] text-4xl mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-[#3b1f2b] mb-4 uppercase tracking-wider">
          IT&apos;S TIME TO SPARKLE & SHINE
        </h3>
        <p className="text-[#3b1f2b]/80 max-w-2xl mx-auto">
          Join thousands of women who have discovered their perfect strands
        </p>
      </section>
    </div>
  );
};

export default AboutPage;