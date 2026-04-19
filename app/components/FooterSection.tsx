'use client';

import React, { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  StickerSVG,
  FooterLogoSVG,
  MailIconSVG,
  ResultIconSVG,
  SocialIconSVG,
} from './FooterSVGs';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TRAIL_IMAGES = [
  '/logos/gh-logo-blue.svg',
  '/logos/gh-logo-pink.svg',
  '/logos/gh-logo-green.svg',
  '/logos/gh-logo-red.svg',
];

export default function FooterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const trailZoneRef = useRef<HTMLDivElement>(null);
  const incrRef = useRef(0);
  const oldPosRef = useRef({ x: 0, y: 0 });
  const indexImgRef = useRef(0);

  // Parallax reveal effect
  useGSAP(() => {
    gsap.fromTo(
      footerRef.current,
      { yPercent: -40 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    );

    gsap.to('.footer-sticker-rotate', {
      rotation: 360,
      duration: 15,
      repeat: -1,
      ease: 'none',
    });
  }, { scope: containerRef });

  // Mouse trail logic
  const createMedia = useCallback((x: number, y: number, deltaX: number, deltaY: number) => {
    const root = trailZoneRef.current;
    if (!root) return;

    const img = document.createElement('img');
    img.setAttribute('src', TRAIL_IMAGES[indexImgRef.current]);
    img.className = 'absolute w-[12vw] max-w-[180px] pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2';
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    root.appendChild(img);

    const tl = gsap.timeline({
      onComplete: () => {
        if (root.contains(img)) root.removeChild(img);
        tl.kill();
      },
    });

    tl.fromTo(img, 
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
    );

    tl.to(img, {
      x: '+=' + deltaX * 1.5,
      y: '+=' + deltaY * 1.5,
      rotation: (Math.random() - 0.5) * 45,
      duration: 1,
      ease: 'power1.out'
    }, 0);

    tl.to(img, {
      opacity: 0,
      scale: 0.4,
      duration: 0.5,
      delay: 0.2
    });

    indexImgRef.current = (indexImgRef.current + 1) % TRAIL_IMAGES.length;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) return;
    const root = trailZoneRef.current;
    if (!root) return;

    const rect = root.getBoundingClientRect();
    const valX = e.clientX;
    const valY = e.clientY;

    if (oldPosRef.current.x === 0) {
      oldPosRef.current = { x: valX, y: valY };
      return;
    }

    const dist = Math.sqrt(Math.pow(valX - oldPosRef.current.x, 2) + Math.pow(valY - oldPosRef.current.y, 2));
    incrRef.current += dist;

    if (incrRef.current > 130) {
      incrRef.current = 0;
      createMedia(valX - rect.left, valY - rect.top, valX - oldPosRef.current.x, valY - oldPosRef.current.y);
    }
    oldPosRef.current = { x: valX, y: valY };
  }, [createMedia]);

  const currentYear = new Date().getFullYear();

  return (
    <section 
      ref={containerRef} 
      className="section_footer relative w-full bg-[#fcfbf7] overflow-hidden"
    >
      <div 
        ref={footerRef} 
        className="cs-footer relative w-full bg-[#fcfbf7] flex flex-col border-t border-black/5"
      >
        
        {/* Top CTA: Let's get hyped! */}
        <div 
          ref={trailZoneRef}
          className="cs-footer-cta relative flex flex-col items-center text-center px-6 pt-56 pb-24 md:pb-40 z-10 cursor-default"
          onMouseMove={handleMouseMove}
        >
          <h2 className="text-[clamp(2.8rem,6.8vw,6.0rem)] leading-[0.82] font-semibold tracking-[-0.05em] text-black mb-16 select-none relative z-10">
            Let&rsquo;s get hyped!
          </h2>
          
          <div className="button-group flex flex-col sm:flex-row justify-center items-center gap-6 relative z-[100] mt-10">
            {/* Mail Box Button */}
            <a href="mailto:info@gethyped.nl" className="button-default group">
              <div className="button-default__inner !bg-white/0 border-[1.5px] border-black !rounded-full pr-1.5 pl-2 py-1.5 font-bold !min-h-[58px]">
                <span className="button-default__background !border-none !rounded-full"></span>
                <span className="button-default__text !text-[17px] text-black pr-4">Mail ons direct</span>
                <div className="button-default__icon !bg-black !rounded-[18px] !w-[46px] !h-[46px] flex items-center justify-center !text-white transform group-hover:scale-105 transition-transform duration-300">
                  <MailIconSVG className="w-5 h-4" />
                </div>
              </div>
            </a>
            
            {/* Results Button */}
            <a href="#" className="button-default group">
              <div className="button-default__inner !rounded-full pr-1.5 pl-2 py-1.5 font-bold !min-h-[58px]">
                <span className="button-default__background !rounded-full" style={{ backgroundColor: '#FF5B37' }}></span>
                <span className="button-default__text !text-white !text-[17px] pr-4">Get Results</span>
                <div className="button-default__icon !bg-white !rounded-[18px] !w-[46px] !h-[46px] flex items-center justify-center !text-[#FF5B37] transform group-hover:scale-105 transition-transform duration-300">
                  <ResultIconSVG className="w-4 h-5" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Diagonal Slant Section: Beige Background - Minimal High-Right Slope */}
        <div className="relative w-full mt-auto z-30 px-5">
          {/* Circular Badge: Anchored to the High-Right shoulder */}
          <div className="absolute top-0 right-[7.5%] w-[88px] md:w-[160px] z-50 transform -translate-y-[90%]">
            <div className="footer-sticker-rotate">
              <StickerSVG className="w-full h-full" />
            </div>
          </div>

          <div 
            className="cs-footer-bottom relative w-full pt-20 pb-4 px-6 md:px-20 bg-[#f3f0e8] mt-[-80px] rounded-tr-[40px] md:rounded-tr-[80px]"
            style={{ 
              clipPath: 'polygon(0 calc(65% + 20px), 5px calc(65% + 8px), 12px calc(65% + 2px), 20px 65%, 100% 0%, 100% 100%, 0% 100%)' 
            }}
          >

          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end gap-16 relative z-10">
            
            {/* Left Side: Branding Logo */}
            <div className="w-full md:w-1/3 flex justify-start items-end pb-[10px]">
              <FooterLogoSVG className="w-[195px] md:w-[316px] h-auto transform -translate-x-[20%] opacity-100" />
            </div>

            {/* Right Side: Information Content */}
            <div className="w-full md:w-2/3 flex flex-col gap-4 text-right">
              
              <div className="flex flex-col md:flex-row justify-end items-start gap-8 md:gap-16 w-full pt-8">
                
                {/* Information Sub-Column: Links & Socials (LEFT of the grid) */}
                <div className="flex flex-col gap-6 items-start text-left transform translate-y-[35%]">
                  {/* Sitemap: Swoosh Effect Pills */}
                  <div className="flex flex-wrap gap-[6px]">
                    {['Expertises', 'Work', 'About', 'Contact'].map((label) => (
                      <a
                        key={label}
                        href={`/${label.toLowerCase()}`}
                        className="button-color-swoosh bg-white shadow-sm border border-black/5 !rounded-[14px] !px-6 !py-[0.6rem]"
                      >
                        <span className="button-color-swoosh_bg !rounded-[14px]">
                          <span style={{ '--index': 0 } as any} className="button-color-swoosh_bg-inner"></span>
                        </span>
                        <span data-text={label} className="button-color-swoosh_inner">
                          <span className="button-color-swoosh_text hover:!text-white !text-[15px] font-bold text-black">{label}</span>
                        </span>
                      </a>
                    ))}
                  </div>

                  {/* Social Media Row */}
                  <div className="flex items-center gap-6">
                    <div className="text-[16px] font-bold text-black select-none">Follow us</div>
                    <div className="flex gap-4">
                      {['linkedin', 'tiktok', 'instagram', 'youtube'].map((name) => (
                        <a
                          key={name}
                          href="#"
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                        >
                          <SocialIconSVG name={name} className="w-5 h-5 text-black" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Information Sub-Column: Contact & Address (HARD RIGHT SIDE - Vertical Stack) */}
                <div className="flex flex-col gap-2 items-end text-left w-full md:w-auto">
                  <div className="flex flex-col gap-2">
                    <div className="text-[20px] font-bold text-black mb-1">Contact</div>
                    <div className="flex flex-col gap-1 text-[17px] font-normal leading-tight text-black opacity-80">
                      <a href="mailto:info@gethyped.nl">info@gethyped.nl</a>
                      <a href="tel:+31615337496">+31 6 1533 7496</a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="text-[20px] font-bold text-black mb-1">Adres</div>
                    <div className="text-[17px] font-normal leading-tight text-black opacity-80">
                      Beltrumsestraat 6,<br />
                      7141 AL Groenlo
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Credits Bar (Minimized space) */}
              <div className="flex flex-col md:flex-row justify-between items-center w-full pt-4 border-t border-black/5 gap-4">
                 <div className="text-[13px] font-medium text-black opacity-40">
                   © {currentYear} Get Hyped
                 </div>
                 <div className="text-[13px] font-medium text-black opacity-40">
                   © Design by Dylan
                 </div>
                 <a href="#" className="text-[13px] font-medium text-black opacity-40 hover:opacity-100 transition-opacity">
                   Privacyvoorwaarden
                 </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      </div>
    </section>
  );
}
