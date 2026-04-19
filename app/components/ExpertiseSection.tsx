'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EXPERTISE_DATA = [
  {
    number: "01",
    title: "Social strategy",
    subtitle: "Slimme strategie. Sterke start.",
    description: "We duiken diep in jouw merk, doelgroep en doelen. En vertalen data naar een duidelijk plan met formats die écht impact maken. Zo weet je precies waarom het werkt.",
    bgColor: "bg-[#FAF4EC]",
    textColor: "text-[#161616]",
    accentColor: "text-[#161616]/5", // Subtler number
    buttonText: "Meer over social strategie",
    buttonType: "orange",
    video: "https://gethyped.b-cdn.net/MD/MD%20Loop%20Schaken.mp4"
  },
  {
    number: "02",
    title: "Content creation",
    subtitle: "Content die opvalt en raakt.",
    description: "We maken content die opvalt. Blijft hangen. En jouw doelgroep raakt. Creatief, snel en energiek. Altijd met het doel voor ogen.",
    bgColor: "bg-[#FCB8FA]",
    textColor: "text-[#161616]",
    accentColor: "text-white/20", 
    buttonText: "Meer over content creatie",
    buttonType: "white",
    video: "https://gethyped.b-cdn.net/Expertises/Loop%20BTS%20comp.mp4"
  },
  {
    number: "03",
    title: "Activation",
    subtitle: "Zichtbaar waar en wanneer het telt.",
    description: "De juiste content verdient het om gezien te worden. We verspreiden de content waar jouw doelgroep is. Zo raakt jouw merk de juiste mensen.",
    bgColor: "bg-[#33C791]",
    textColor: "text-[#161616]",
    accentColor: "text-black/5",
    buttonText: "Meer over activatie",
    buttonType: "white",
    video: "https://gethyped.b-cdn.net/Over%20de%20Top/overdetop-loop.mp4"
  },
  {
    number: "04",
    title: "Data",
    subtitle: "Inzichten die impact maken.",
    description: "We duiken in de cijfers om te snappen wat écht werkt. En sturen jouw content scherp bij. Want meten is weten, maar weten wat je doet is beter.",
    bgColor: "bg-[#0D8DFF]",
    textColor: "text-[#161616]",
    accentColor: "text-black/10",
    buttonText: "Meer over data & analytics",
    buttonType: "white",
    video: "https://gethyped.b-cdn.net/Expertises/Data%20comp.mp4"
  }
];

export default function ExpertiseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const slides = gsap.utils.toArray<HTMLElement>('.expertise-slide');
    
    slides.forEach((slide, index) => {
      const isLast = index === slides.length - 1;
      const content = slide.querySelector('.expertise-content');
      const wrap = slide.querySelector('.expertise-wrap');

      if (!isLast && content && wrap) {
        gsap.to(content, {
          rotationX: 35,
          scale: 0.8,
          yPercent: -15,
          opacity: 0.3,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: slide,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: wrap,
            pinSpacing: false
          }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section id="expertises" ref={containerRef} className="w-full bg-[#f7f2ea]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {EXPERTISE_DATA.map((card, idx) => (
          <div key={idx} className="expertise-slide h-screen w-full flex items-center justify-center relative">
            <div className="expertise-wrap w-full h-full flex items-center justify-center perspective-[250vw]">
              <div 
                className={`expertise-content relative w-full h-auto lg:h-[85vh] min-h-[85vh] ${card.bgColor} rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-20 flex flex-col justify-between gap-6 lg:gap-0 overflow-hidden origin-[50%_0%] shadow-2xl transition-shadow duration-500`}
                suppressHydrationWarning
              >
                {/* Top Section */}
                <div className="flex flex-col gap-4 lg:gap-6 relative z-10 w-full" suppressHydrationWarning>
                  <div className="flex justify-between items-start w-full">
                    <div className="bg-[#EBE4D9] w-max px-3 py-1.5 rounded-[0.5rem]" suppressHydrationWarning>
                      <span className="text-[13px] font-bold text-[#161616]/80">Expertise</span>
                    </div>
                    {/* Mobile Number */}
                    <div className="lg:hidden text-[2.5rem] font-bold text-[#161616]/10 leading-[0.8] tracking-tighter mix-blend-multiply" suppressHydrationWarning>
                      {card.number}
                    </div>
                  </div>
                  <h2 className="text-[clamp(3.2rem,10vw,5.5rem)] leading-[0.95] font-bold tracking-[-0.04em] text-[#161616] max-w-[90%]" suppressHydrationWarning>
                    {card.title}
                  </h2>
                </div>

                {/* Desktop Number */}
                <div className={`hidden lg:block absolute top-10 right-12 text-[clamp(6rem,14vw,12rem)] font-bold ${card.accentColor} select-none pointer-events-none leading-[0.7] z-0`} suppressHydrationWarning>
                  {card.number}
                </div>

                {/* Mobile Video */}
                <div className={`lg:hidden w-[55%] max-w-[240px] aspect-[4/5] rounded-[1.2rem] overflow-hidden relative shadow-lg rotate-[2deg] z-10 ${card.buttonType === 'orange' ? 'border-[3px] border-[#FF4C24]' : ''}`}>
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="absolute inset-0 w-full h-full object-cover"
                      src={card.video}
                    />
                </div>

                {/* Video/Image Container (Right Side Desktop) */}
                <div className="hidden lg:block absolute right-[8%] bottom-[12%] w-[22vw] max-w-[380px] aspect-[4.8/6.2] rounded-[2.5rem] overflow-hidden p-[8px] bg-white rotate-[3deg] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20">
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      className="w-full h-full object-cover rounded-[1.8rem]"
                      src={card.video}
                    />
                </div>

                {/* Bottom Section */}
                <div className="max-w-[45ch] flex flex-col gap-6 lg:gap-8 relative z-10" suppressHydrationWarning>
                  <div className="flex flex-col gap-3 lg:gap-4" suppressHydrationWarning>
                    <h3 className="text-[1.35rem] lg:text-[2rem] font-bold leading-[1.15] text-[#161616] tracking-[-0.02em]" suppressHydrationWarning>
                      {card.subtitle}
                    </h3>
                    <p className="text-[0.95rem] lg:text-[1.125rem] leading-[1.5] text-[#161616] font-medium opacity-90" suppressHydrationWarning>
                      {card.description}
                    </p>
                  </div>

                  <Link href="/expertises" className="group w-max">
                    <div className={`flex items-center rounded-xl pl-5 pr-1.5 py-1.5 transition-all duration-500 ease-[cubic-bezier(0.34,2.27,0.64,1)] group-hover:skew-y-[-2deg] group-hover:rotate-[-1deg] group-hover:scale-[1.05] shadow-sm border border-black/5 ${card.buttonType === 'white' ? 'bg-white text-[#161616]' : 'bg-[#FF4C24] text-white'}`}>
                      <span className="font-bold text-[0.95rem] lg:text-[0.95rem] mr-4">{card.buttonText}</span>
                      <div className={`${card.buttonType === 'white' ? 'bg-[#131313] text-white' : 'bg-white text-[#FF4C24]'} rounded-[0.5rem] w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transform transition-transform duration-300 group-hover:translate-x-1 w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
