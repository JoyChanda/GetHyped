'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SELECTED_WORK_DATA = [
  {
    id: 'bullit',
    title: "Van nul naar vol, binnen 3 weken",
    brand: "Bullit",
    image: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/69c3d06cc7a0b07e150a671d_Bullit%20branded%20placeholder_2.1.1.avif",
    video: "/Bullit _ Loop.mp4",
    brandColor: "#FF4C24",
    labelBg: "#FF856B",
  },
  {
    id: 'roasta',
    title: "Zacht in smaak, sterk in beeld",
    brand: "Roasta",
    image: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/68716a54a3bf63bf25c2ae92_roasta-placeholder.avif",
    video: "https://gethyped.b-cdn.net/Roasta/roasta-loop.mp4",
    brandColor: "#0084FF",
    labelBg: "#4DABFF",
  },
  {
    id: 'loco',
    title: "Content die écht smaakt (en raakt)",
    brand: "Loco",
    image: "https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/68716b4e8982337b1d3d1bd7_loco-loco-placeholder.avif",
    video: "https://gethyped.b-cdn.net/Loco/loco-bites-loop.mp4",
    brandColor: "#29C48A",
    labelBg: "#66D9AB",
  }
];

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 480px)", () => {
      const items = gsap.utils.toArray<HTMLElement>('.sw-item');
      
      items.forEach((item, index) => {
        let targetY = "0em";
        if (index === 0) targetY = "0em";
        if (index === 1) targetY = "-12em"; 
        if (index === 2) targetY = "-24em"; 

        gsap.fromTo(item,
          { y: "6em" },
          {
            y: targetY,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#FAF4EC] overflow-hidden" suppressHydrationWarning={true}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12" suppressHydrationWarning={true}>
        
        {/* Header Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-[650px]">
            <h2 className="text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[#161616] mb-8">
              Content <br />dat scoort.
            </h2>
            <p className="text-[1.25rem] md:text-[1.5rem] leading-[1.3] text-[#161616] opacity-80 max-w-[45ch] mb-10">
              Wij vertellen jouw verhaal. Op een manier die écht past bij jouw doelgroep. Met creatieve content die werkt en het verschil maakt.
            </p>
            
            <Link href="/work" className="group inline-flex items-center">
              <div className="flex items-center bg-transparent border border-[#131313] rounded-2xl pl-6 pr-2 py-2 transition-all duration-500 ease-[cubic-bezier(0.34,2.27,0.64,1)] group-hover:skew-y-[-2deg] group-hover:rotate-[-1deg] group-hover:scale-[1.05] shadow-sm">
                <span className="font-bold text-[1.1rem] text-[#131313] mr-6">Bekijk al ons werk</span>
                <div className="bg-[#131313] text-[#FAF4EC] rounded-xl w-12 h-12 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 19L19 5M19 5H10M19 5V14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Selected Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {SELECTED_WORK_DATA.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ item }: { item: typeof SELECTED_WORK_DATA[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
        if (!videoRef.current.src) {
            videoRef.current.src = item.video;
        }
        videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="sw-item w-full" suppressHydrationWarning>
      <Link 
        href={`/work/${item.id}`} 
        className="relative block w-full aspect-[14.8/19.18] rounded-[2.5rem] p-2 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] hover:-rotate-1 hover:-skew-y-1"
        style={{ backgroundColor: item.brandColor }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Media Holder */}
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black/10" suppressHydrationWarning>
          <Image 
            src={item.image} 
            alt={item.title} 
            fill 
            className={`object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          />
          <video 
            ref={videoRef}
            muted 
            loop 
            playsInline 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Floating Overlay Wrapper */}
        <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none" suppressHydrationWarning>
          
          {/* Content Container */}
          <div 
            className="p-3.5 md:p-4 rounded-b-[1.2rem]"
            style={{ backgroundColor: item.brandColor }}
            suppressHydrationWarning
          >
            <h3 className="text-[1.2rem] md:text-[1.3rem] font-bold leading-[1.05] text-white mb-2.5 max-w-[18ch]">
              {item.title}
            </h3>
            <div 
              className="w-max px-2 py-0.5 rounded-md font-bold text-[0.75rem] text-white"
              style={{ backgroundColor: item.labelBg }}
              suppressHydrationWarning
            >
              {item.brand}
            </div>
          </div>

          {/* Slanted Shape Overlay */}
          <div 
            className="absolute top-0 left-0 w-full -translate-y-[calc(100%-1px)]"
            style={{ color: item.brandColor }}
            suppressHydrationWarning={true}
          >
            <svg 
              viewBox="0 0 429 174" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block scale-y-[0.45] origin-bottom translate-y-[4px]"
            >
              <path 
                d="M428.625 35.0943V136.589C428.625 152.326 428.625 167.249 428.625 173.088L1.03513e-06 173.082C-1.56688e-05 170.148 0.000175319 166.808 0.000175319 159.068V77.9695C0.000175319 70.9826 5.03458 65.0132 11.904 63.8674L388.605 1.00885C409.565 -2.47661 428.625 13.7568 428.625 35.0862" 
                fill="currentColor"
              />
            </svg>

            {/* Arrow Icon with Diagonal Double Slide Animation - Positioned at absolute peak and reversed direction */}
            <div className={`absolute top-[6.0rem] right-[0.7rem] w-[2.8rem] h-[2.8rem] bg-white rounded-full shadow-lg overflow-hidden transition-all duration-500 ease-out z-[10] ${isHovered ? 'scale-105' : 'scale-100'}`} suppressHydrationWarning>
              {/* Arrow 1: Exits top-right on hover */}
              <div className={`absolute inset-0 flex items-center justify-center text-black transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] ${isHovered ? 'translate-x-full -translate-y-full' : 'translate-x-0 translate-y-0'}`} suppressHydrationWarning>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
              {/* Arrow 2: Enters from bottom-left on hover */}
              <div className={`absolute inset-0 flex items-center justify-center text-black transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] ${isHovered ? 'translate-x-0 translate-y-0' : '-translate-x-full translate-y-full'}`} suppressHydrationWarning>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
