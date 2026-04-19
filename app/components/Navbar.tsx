'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenModal?: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [menuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 100 && latest > previous) {
      setHidden(true);
      setMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { label: 'Expertises', id: 'expertises' },
    { label: 'Work', id: 'work' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const LogoSVG = ({ bgFill }: { bgFill: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 md:h-11 w-auto" viewBox="0 0 208 84" fill="none">
      <path d="M207.793 18.4091V68.8219C207.793 77.2049 200.998 84 192.615 84H7.46524C3.34207 84 0 80.6579 0 76.5348V37.5951C0 33.8732 2.69331 30.6933 6.36831 30.0829L186.384 0.251801C197.596 -1.60491 207.793 7.04266 207.793 18.4049" fill={bgFill} />
      <path d="M188.876 80.0646H55.9061V25.8317L186.618 5.34814C195.454 3.96521 203.444 10.7945 203.444 19.7408V65.4969C203.444 73.5427 196.922 80.0646 188.876 80.0646Z" fill="black" />
      <path d="M71.2635 26.8177V47.2585L67.5415 47.5957V27.3683L59.9312 28.4866V76.7781L67.5415 76.7055V56.478L71.2635 56.2305V76.6714L79.3818 76.5945V25.6226L71.2635 26.8177Z" fill="white" />
      <path d="M94.7092 23.3646L92.5452 42.7512L92.4427 44.4116L92.2378 44.4329L92.1354 42.7939L90.0055 24.0561L81.2256 25.3494L87.9482 58.2622V76.5134L96.8391 76.4323V57.75L104.142 21.9731L94.7092 23.3646Z" fill="white" />
      <path d="M159.835 25.0207V13.7695L135.377 17.3719V76.0695L159.835 75.839V64.5921L147.179 65.0274V51.2238L159.101 50.4384V39.2854L147.179 40.3695V26.5701L159.835 25.0207Z" fill="white" />
      <path d="M120.844 48.8506L116.226 49.2006V29.3018L120.844 28.7256V48.8506ZM105.943 21.7085V76.347L116.149 76.2488V58.5396L120.882 58.2878C127.071 57.9591 131.92 52.8457 131.92 46.6482V31.3805C131.92 24.2695 125.603 18.8146 118.565 19.8518L105.943 21.7128V21.7085Z" fill="white" />
      <path d="M182.598 64.7713L176.494 64.9677V21.7768L182.598 21.0128V64.7713ZM162.993 13.3042V75.8091L185.769 75.5957C192.163 75.536 197.315 70.3372 197.315 63.9433V21.7469C197.315 14.636 190.998 9.18108 183.959 10.2183L162.989 13.3085L162.993 13.3042Z" fill="white" />
      <path d="M21.5464 80.0646H34.7482V70.4738L27.1336 70.6957V59.8585L34.2873 59.4018V49.8835L27.1336 50.5494V39.7079L34.7482 38.739V29.1481L21.5464 31.214V80.0646Z" fill="black" />
      <path d="M36.7714 28.828V38.4829L42.03 37.8128V80.0646H48.3812V37.0061L54.0239 36.289V26.1262L36.7714 28.828Z" fill="black" />
      <path d="M14.2348 51.7488V41.2829L8.49394 42.0128V71.5152L14.2348 71.3488V62.6969L10.7092 62.8976V54.5146L19.5616 53.7634V80.0604H14.2391V77.3159L13.3128 78.225C12.1134 79.4031 10.5 80.0604 8.8226 80.0604H7.90491C5.48905 80.0604 3.53418 78.1012 3.53418 75.6896V39.0207C3.53418 36.1524 5.62563 33.7067 8.45978 33.2628L14.5165 32.3152C17.1671 31.9012 19.5659 33.95 19.5659 36.6305V51.2494L14.2433 51.7445L14.2348 51.7488Z" fill="black" />
    </svg>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes splashIn {
          0%   { clip-path: circle(0% at calc(100% - 44px) 44px); }
          75%  { clip-path: circle(120% at calc(100% - 44px) 44px); }
          88%  { clip-path: circle(108% at calc(100% - 44px) 44px); }
          100% { clip-path: circle(115% at calc(100% - 44px) 44px); }
        }
        @keyframes splashOut {
          0%   { clip-path: circle(115% at calc(100% - 44px) 44px); }
          100% { clip-path: circle(0% at calc(100% - 44px) 44px); }
        }
        .splash-enter { animation: splashIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .splash-exit  { animation: splashOut 0.38s cubic-bezier(0.76, 0, 0.24, 1) forwards; }
        .menu-item {
          opacity: 0;
          transform: translateY(24px) scale(0.96);
          animation: menuBounceUp 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes menuBounceUp {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />

      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-150%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-4 md:top-6 left-0 right-0 z-[900] px-4 md:px-8 flex items-center justify-between pointer-events-none"
      >
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="pointer-events-auto flex items-center active:scale-95 transition-transform">
          <LogoSVG bgFill="#FAF4EC" />
        </button>

        {/* Desktop Nav Pills */}
        <div className="pointer-events-auto hidden md:flex items-center gap-0.5 bg-white p-1.5 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/5">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className="button-color-swoosh">
              <span className="button-color-swoosh_bg">
                <span style={{ '--index': 0 } as any} className="button-color-swoosh_bg-inner"></span>
              </span>
              <span data-text={link.label} className="button-color-swoosh_inner">
                <span className="button-color-swoosh_text">{link.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Right: Desktop CTA + Hamburger */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="hidden md:block">
            <button onClick={onOpenModal} className="button-default">
              <div className="button-default__inner">
                <span className="button-default__background"></span>
                <span className="button-default__text">Get Results</span>
                <div className="button-default__icon">🔥</div>
              </div>
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative flex justify-center items-center w-[56px] h-[56px] bg-[#fcb8fa] rounded-[12px] z-[960] cursor-pointer shadow-sm"
          >
            <span className={`w-[20px] h-[2px] bg-[#161616] absolute transition-transform duration-300 ${menuOpen ? 'rotate-45' : '-translate-y-[5px]'}`} />
            <span className={`w-[20px] h-[2px] bg-[#161616] absolute transition-transform duration-300 ${menuOpen ? '-rotate-45' : 'translate-y-[5px]'}`} />
          </button>
        </div>
      </motion.nav>

      {/* Full-Screen Splash Menu */}
      <AnimatePresence>
        {menuOpen && (
          <div
            key="splash-menu"
            className="splash-enter fixed bg-[#fcb8fa] md:hidden flex flex-col rounded-[20px]"
            style={{ top: 4, left: 4, right: 4, bottom: 4, zIndex: 950, willChange: 'clip-path' }}
          >
            {/* Top: Logo + Close */}
            <div className="flex items-center justify-between px-5 pt-6 flex-shrink-0">
              <button onClick={() => scrollTo('hero')} className="active:scale-95 transition-transform">
                <LogoSVG bgFill="#fcb8fa" />
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                style={{ backgroundColor: '#ffffff' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Center: Nav Links — auto width, centered */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ minHeight: 0, overflow: 'hidden' }}>
              {navLinks.map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="menu-item bg-white rounded-[1.5rem] px-10 py-[1.1rem] font-bold text-[1.25rem] text-[#161616] shadow-sm active:scale-95 transition-transform"
                  style={{ animationDelay: `${0.14 + i * 0.07}s`, minWidth: '200px', textAlign: 'center' }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Bottom: Get Results */}
            <div className="px-5 flex justify-center flex-shrink-0" style={{ paddingBottom: '30%' }}>
              <button
                onClick={() => { setMenuOpen(false); onOpenModal?.(); }}
                className="menu-item inline-flex items-center bg-[#161616] text-white pl-7 pr-[6px] py-[6px] rounded-[2rem] shadow-md active:scale-95 transition-transform"
                style={{ animationDelay: '0.42s' }}
              >
                <span className="font-bold text-[17px] tracking-tight pr-3">Get Results</span>
                <div
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <svg width="18" height="22" viewBox="0 0 56 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 0C28 0 34 14 28 22C22 14 8 18 8 30C8 44.4 17.6 54 28 54C38.4 54 48 44.4 48 30C48 22 44 14 44 14C44 14 42 28 34 28C38 22 34 6 28 0Z" fill="#FF4C24"/>
                    <path d="M28 34C28 34 22 40 22 46C22 49.3 24.7 52 28 52C31.3 52 34 49.3 34 46C34 40 28 34 28 34Z" fill="#FF8C42"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
