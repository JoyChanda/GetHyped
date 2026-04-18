'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function IntroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1], // Smooth custom easing
      },
    },
  };

  return (
    <section id="intro-home" className="py-24 w-full max-w-[1400px] mx-auto px-6 overflow-hidden">
      {/* Inject custom CSS for exact jellybelly button animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .button-default {
          --bounce-ease: cubic-bezier(0.34, 2.27, 0.64, 1);
          --speed: 0.45s;
        }
        .button-default__inner {
          transition: transform var(--speed) var(--bounce-ease), background-color 0.3s ease;
          will-change: transform;
        }
        @media (hover: hover) and (pointer: fine) {
          .button-default:hover .button-default__inner,
          .button-default:focus-visible .button-default__inner {
            transform: skewY(-4deg) rotate(-1deg) scale(1.02);
          }
          .button-default.is-icon:hover .button-default__inner,
          .button-default.is-icon:focus-visible .button-default__inner {
            transform: skewY(-1deg) rotate(-1deg) scale(1.02);
          }
          .button-default:active .button-default__inner {
            transform: scale(0.95);
          }
        }
      `}} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-8 items-end"
        suppressHydrationWarning
      >
        {/* Top Text */}
        <motion.div variants={itemVariants} className="md:col-span-12 mb-8 md:mb-16">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.03em] font-medium text-[#161616] max-w-[900px]">
            Wij maken content die opvalt. Die blijft hangen. Die jouw doelgroep raakt en jouw merk in beweging brengt. Snel, krachtig en energiek.
          </h2>
        </motion.div>

        {/* Left Image/Video */}
        <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-3">
          <div className="relative w-full md:max-w-[300px] aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-md group cursor-pointer">
            <Image
              src="https://cdn.prod.website-files.com/6848603da8e6ac95794b7498/6894757aa6dd3f84f6e463a2_Anniek%20Bril.webp"
              alt="Intro representation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </motion.div>

        {/* Spacer for layout accuracy */}
        <div className="hidden lg:block lg:col-span-3"></div>

        {/* Right Text & Buttons */}
        <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-6 flex flex-col gap-8 md:gap-12 md:pb-6">
          <p className="text-[1.125rem] md:text-[1.25rem] leading-[1.4] text-[#161616] font-medium max-w-[42ch]">
            We stoppen niet bij mooie plaatjes en vette beelden. We maken het meetbaar. Zo weet je precies wat werkt en wat niet. Nooit meer content zonder strategie. Nooit meer content zonder resultaat.
          </p>

          <div className="flex items-center justify-between w-full mt-4">
            {/* Left Button: "Leer ons kennen" */}
            <Link
              href="/about"
              className="button-default group w-max"
            >
              <div className="button-default__inner flex items-center bg-transparent border border-[#131313] rounded-xl pl-4 pr-1.5 py-1.5 transition-shadow hover:shadow-sm">
                <span className="font-medium text-[0.95rem] text-[#131313] mr-4">
                  Leer ons kennen
                </span>
                {/* Black Icon Box */}
                <div className="bg-[#131313] text-[#FAF4EC] rounded-[0.5rem] w-8 h-8 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#131313]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Right Button: Down Arrow Icon with Scroll Animation */}
            <a
              href="#expertises"
              className="button-default is-icon hidden md:flex group"
            >
              <div className="button-default__inner flex items-center justify-center border border-[#131313] bg-transparent rounded-xl w-[2.85rem] h-[2.85rem] overflow-hidden relative cursor-pointer">
                <div className="absolute top-[-100%] left-0 w-full h-[200%] flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-1/2">
                  {/* First Icon (Hidden Top initially, slides in on hover) */}
                  <div className="w-full h-1/2 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF4C24"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14" />
                      <path d="m19 12-7 7-7-7" />
                    </svg>
                  </div>
                  {/* Second Icon (Visible initially, slides down on hover) */}
                  <div className="w-full h-1/2 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF4C24"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14" />
                      <path d="m19 12-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
          
        </motion.div>
      </motion.div>
    </section>
  );
}
