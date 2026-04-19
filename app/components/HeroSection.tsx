'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const restingStyles = useMemo(() => [
    { rotate: -12, y: -20, x: "-5%" },
    { rotate: -4, y: 10, x: "0%" },
    { rotate: 4, y: -10, x: "5%" },
    { rotate: 12, y: 30, x: "10%" },
  ], []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const index = Math.floor(x / (width / 4));
    if (index >= 0 && index < 4) setActiveIndex(index);
  };

  const handleMouseLeave = () => setActiveIndex(null);

  const getCardStyle = (index: number) => {
    if (activeIndex === null) {
      return {
        x: restingStyles[index].x,
        y: restingStyles[index].y,
        rotate: restingStyles[index].rotate,
        scale: 1,
        zIndex: 40 - index 
      };
    }
    if (index === activeIndex) {
      return { x: "0%", y: 0, rotate: 0, scale: 1.1, zIndex: 100 };
    }
    const pushPercentage = 24 / (index - activeIndex);
    return {
      x: `${pushPercentage}%`,
      y: 0,
      rotate: (index - activeIndex) * 5,
      scale: 1,
      zIndex: 50 - Math.abs(index - activeIndex)
    };
  };

  const CARD_WIDTH = "21em"; 
  const CARD_ASPECT = "4.8/6.2";

  return (
    <section className="pt-[140px] px-6 w-full max-w-[1400px] mx-auto pb-12 sm:pb-32 bg-[#FAF4EC]">
      
      {/* 1. Header Section */}
      <div className="w-full flex flex-col items-start mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[1100px]"
        >
          <h1 className="text-[clamp(2.5rem,6.8vw,6.1rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[#161616] mb-10">
            Get Hyped. Get<br/>Noticed. Get Results.
          </h1>
          <p className="text-[clamp(1rem,1.5vw,1.3rem)] font-semibold text-[#161616] opacity-90 leading-snug max-w-[400px]">
            Klaar met gokken op content<br className="hidden sm:block"/> die niets oplevert?
          </p>
        </motion.div>
      </div>

      {/* 2. Interactive Cards Section */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-[450px] lg:h-[550px] w-full hidden md:flex justify-center items-end overflow-visible"
      >
        <div className="flex justify-center items-end w-full max-w-[1200px]">
           
           {/* Card 0: Blue Stats */}
           <motion.div
             animate={getCardStyle(0)}
             transition={{ type: "spring", stiffness: 100, damping: 14 }}
             className="relative bg-[#0D8DFF] rounded-[2.5em] p-[1.8em] shadow-2xl flex flex-col justify-between origin-bottom overflow-hidden"
             style={{ width: CARD_WIDTH, aspectRatio: CARD_ASPECT }}
             suppressHydrationWarning
           >
              <div className="text-[#101010] text-[4em] font-bold leading-none tracking-[-0.05em]" suppressHydrationWarning>10M+</div>
              <div className="flex flex-col gap-[0.4em] w-full text-left" suppressHydrationWarning>
                <h2 className="font-bold text-[1.5em] text-[#101010] tracking-[-0.02em] leading-tight">Organische views</h2>
                <div className="w-full h-[1px] bg-[#101010]/20 my-[0.4em]"></div>
                <p className="text-[0.95em] font-medium text-[#101010]/80">Groei door slimme content</p>
              </div>
           </motion.div>

           {/* Card 1: Video 01 */}
           <motion.div
             animate={getCardStyle(1)}
             transition={{ type: "spring", stiffness: 100, damping: 14 }}
             className="relative ml-[-6vw] bg-black rounded-[2.5em] overflow-hidden shadow-xl origin-bottom"
             style={{ width: CARD_WIDTH, aspectRatio: CARD_ASPECT }}
           >
              <video src="/Loop Salontopper.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
           </motion.div>

           {/* Card 2: Green Stats */}
           <motion.div
             animate={getCardStyle(2)}
             transition={{ type: "spring", stiffness: 100, damping: 14 }}
             className="relative ml-[-6vw] bg-[#33C791] rounded-[2.5em] p-[1.8em] shadow-2xl flex flex-col justify-between origin-bottom overflow-hidden"
             style={{ width: CARD_WIDTH, aspectRatio: CARD_ASPECT }}
             suppressHydrationWarning
           >
              <div className="text-[#101010] text-[4em] font-bold leading-none tracking-[-0.05em]" suppressHydrationWarning>30+</div>
              <div className="flex flex-col gap-[0.4em] w-full text-left" suppressHydrationWarning>
                <h2 className="font-bold text-[1.5em] text-[#101010] tracking-[-0.02em] leading-tight">Merken geholpen</h2>
                <div className="w-full h-[1px] bg-[#101010]/20 my-[0.4em]"></div>
                <p className="text-[0.95em] font-medium text-[#101010]/80">Van start-up tot multinational</p>
              </div>
           </motion.div>

           {/* Card 3: Video 02 */}
           <motion.div
             animate={getCardStyle(3)}
             transition={{ type: "spring", stiffness: 100, damping: 14 }}
             className="relative ml-[-6vw] bg-black rounded-[2.5em] overflow-hidden shadow-xl origin-bottom"
             style={{ width: CARD_WIDTH, aspectRatio: CARD_ASPECT }}
           >
              <video src="/petrolhead-loop.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <h4 className="text-white text-[1.5em] font-black uppercase tracking-tighter text-center px-4 drop-shadow-lg">
                   DIE KLINKT TOCH
                 </h4>
              </div>
           </motion.div>

        </div>
      </div>

      {/* Mobile - 2 overlapping cards side by side */}
      <div className="md:hidden mt-12 mb-8 w-full flex justify-center items-center px-1 xs:px-2">
        <div className="relative flex justify-center items-center w-full max-w-[380px]">
          
          {/* Card 0: Blue Stats */}
          <div
            className="relative z-20 bg-[#0D8DFF] rounded-[1.8em] p-[1.2em] shadow-2xl flex flex-col justify-between origin-bottom overflow-hidden w-[54%] aspect-[4.8/6.2] -mr-[6%]"
            style={{ transform: "translateY(5px) rotate(-1deg)" }}
          >
            <div className="text-[#101010] text-[clamp(2.3rem,9vw,3.2rem)] font-bold leading-none tracking-[-0.05em]">10M+</div>
            <div className="flex flex-col gap-[0.3em] w-full text-left">
              <h2 className="font-bold text-[clamp(0.9rem,3.5vw,1.1rem)] text-[#101010] tracking-[-0.02em] leading-tight">Organische views</h2>
              <div className="w-full h-[1px] bg-[#101010]/20 my-[0.2em]"></div>
              <p className="text-[clamp(0.7rem,2.8vw,0.85rem)] font-medium text-[#101010]/80 leading-snug">Groei door slimme content</p>
            </div>
          </div>

          {/* Card 1: Video 01 */}
          <div
            className="relative z-10 bg-black rounded-[1.8em] overflow-hidden shadow-xl origin-bottom w-[54%] aspect-[4.8/6.2] -ml-[6%]"
            style={{ transform: "translateY(-5px) rotate(3deg)" }}
          >
            <video src="/Loop Salontopper.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </div>

        </div>
      </div>
    </section>
  );
}
