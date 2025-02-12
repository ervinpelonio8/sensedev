import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero1.jpg"
          alt="Industrial Automation"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Innovating Industrial Automation for a Smarter Future
          </h1>

          <p className="text-lg md:text-xl text-gray-200 font-sans">
            Delivering reliable industrial process control solutions with
            precision and innovation.
          </p>

          <button className="bg-secondary hover:bg-secondary/90 text-white font-heading px-8 py-3 rounded-md transition-colors duration-200 inline-flex items-center space-x-2">
            Explore Our Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
