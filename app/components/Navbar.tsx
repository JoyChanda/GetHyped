'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenModal?: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Scroll Behavior: Hide navbar on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 100 && latest > previous) {
      setHidden(true);
      setMenuOpen(false); // Close mobile menu if scrolling down
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
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Clean Jellybelly Buttons – EXACT FROM SOURCE */
        .button-default {
          --bounce-ease: cubic-bezier(0.34, 2.27, 0.64, 1);
          --border-radius-ease: cubic-bezier(0.34, 1.37, 0.64, 1);
          --speed: 0.45s;
          --speed-fast: 0.3s;
          --speed-faster: 0.15s;
          position: relative;
          display: inline-block;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .button-default__inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: transform var(--speed) var(--bounce-ease);
          will-change: transform;
          padding: 0.5rem 1.25rem 0.5rem;
          z-index: 10;
        }
        
        @media (min-width: 768px) {
          .button-default__inner {
             gap: 0.75rem;
             padding: 0.5rem 1.5rem 0.5rem;
          }
        }

        .button-default__background {
          border-radius: 9999px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          z-index: -1;
          background-color: #FFA6FF;
          box-shadow: 0 4px 20px rgba(255,166,255,0.3);
          transition: border-radius var(--speed) var(--border-radius-ease), width var(--speed) var(--bounce-ease);
        }

        .button-default__icon {
          transition: transform var(--speed-faster) ease-out;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          background: white;
          border-radius: 50%;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          font-size: 1rem;
        }

        .button-default__text {
          font-weight: 600;
          color: #111;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        @media (hover: hover) and (pointer: fine) {
          .button-default:hover .button-default__background,
          .button-default:focus-visible .button-default__background {
            border-radius: 12px;
            width: calc(100% - 0.5em);
          }
          
          .button-default:hover .button-default__inner,
          .button-default:focus-visible .button-default__inner {
            transform: skewY(-4deg) rotate(-1deg) scale(1.02);
          }

          .button-default:active .button-default__inner {
            transform: scale(0.95);
          }

          .button-default:hover .button-default__icon,
          .button-default:focus-visible .button-default__icon {
            transform: scale(0.92);
          }
        }

        /* Color Swoosh – EXACT FROM SOURCE */
        .button-color-swoosh {
          --elastic-ease-out: linear(
            0, 0.5737 7.6%, 0.8382 11.87%, 0.9463 14.19%, 1.0292 16.54%,
            1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%,
            1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%,
            1.0219 42.57%, 0.9995 46.99%, 0.9872 51.63%, 0.9842 58.77%,
            1.0011 81.26%, 1
          );
          --smooth-ease: cubic-bezier(.32, .72, 0, 1);
          --color-ease: cubic-bezier(.215, .61, .355, 1);

          transition: transform .45s var(--elastic-ease-out);
          -webkit-tap-highlight-color: transparent;
          position: relative;
          padding: 0.5rem 1.25rem;
          display: inline-block;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
        }

        .button-color-swoosh:active {
          transform: scaleX(0.955) scaleY(0.954);
        }

        .button-color-swoosh_bg {
          transition: scale .45s var(--smooth-ease), background-color .2s var(--color-ease);
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          overflow: hidden;
        }

        .button-color-swoosh_bg-inner {
          position: absolute;
          inset: -30%;
          background-color: black;
          translate: -10% 100% 0;
          rotate: 0 0 1 -12deg;
          transition: translate .6s var(--smooth-ease), rotate .5s var(--smooth-ease);
          transition-delay: calc((var(--index) * -1) * .042s);
        }

        .button-color-swoosh_inner {
          position: relative;
          z-index: 10;
          display: grid;
          place-items: center;
        }

        .button-color-swoosh_inner::after {
          content: attr(data-text);
          color: #FAF4EC;
          display: block;
          grid-area: 1 / 1;
          translate: 0 1.5em 0;
          rotate: 1 1 .5 -30deg;
          transform-origin: top right;
          transition: translate .75s var(--elastic-ease-out), rotate .5s var(--smooth-ease), opacity .2s ease-out;
          opacity: 0;
        }

        .button-color-swoosh_text {
          grid-area: 1 / 1;
          transition: translate .75s var(--elastic-ease-out), rotate .5s var(--smooth-ease), opacity .2s ease-out, color .2s var(--color-ease);
          color: #111;
        }

        @media (hover: hover) and (pointer: fine) {
          .button-color-swoosh:is(:hover, :focus-visible) .button-color-swoosh_bg {
            scale: 1.02 1.02;
          }

          .button-color-swoosh:is(:hover, :focus-visible) .button-color-swoosh_bg-inner {
            translate: -10% 0 0;
            rotate: 0 0 1 0deg;
            /* Using inline var(--index) */
          }

          .button-color-swoosh:is(:hover, :focus-visible) .button-color-swoosh_text {
            rotate: 1 1 0.45 -60deg;
            translate: 0 -1.5em 0;
            opacity: 0;
          }

          .button-color-swoosh:is(:hover, :focus-visible) .button-color-swoosh_inner::after {
            rotate: 1 1 .45 0deg;
            translate: 0 0 0;
            opacity: 1;
            transition-delay: .05s;
          }
        }
      `}} />

      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        // Keep the container transparent & pointer-events-none so we can click beneath it
        className="fixed top-4 md:top-6 left-0 right-0 z-[900] px-4 md:px-8 flex items-center justify-between pointer-events-none"
      >
        {/* Left: Exact Original Source Logo structure */}
        <button
          onClick={() => scrollTo('hero')}
          className="pointer-events-auto flex items-center active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-9 md:h-11 w-auto" viewBox="0 0 208 84" fill="none">
            <path d="M207.793 18.4091V68.8219C207.793 77.2049 200.998 84 192.615 84H7.46524C3.34207 84 0 80.6579 0 76.5348V37.5951C0 33.8732 2.69331 30.6933 6.36831 30.0829L186.384 0.251801C197.596 -1.60491 207.793 7.04266 207.793 18.4049" fill="#FAF4EC" />
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
        </button>

        {/* Center: Nav links exactly identically from source (Color Swoosh) */}
        <div className="pointer-events-auto hidden md:flex items-center gap-0.5 bg-white p-1.5 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="button-color-swoosh"
            >
              <span className="button-color-swoosh_bg">
                {/* We use React inline style to inject the custom css variable index for staggered effect, similar to original HTML */}
                <span style={{ '--index': 0 } as any} className="button-color-swoosh_bg-inner"></span>
              </span>
              <span data-text={link.label} className="button-color-swoosh_inner">
                <span className="button-color-swoosh_text">{link.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Right: Get Results Jellybelly & Menu Button */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Jellybelly Button exactly identically from source */}
          <button onClick={onOpenModal} className="button-default">
            <div className="button-default__inner">
              <span className="button-default__background"></span>
              <span className="button-default__text">Get Results</span>
              <div className="button-default__icon">
                🔥
              </div>
            </div>
          </button>

          {/* Animated Hamburger Icon (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative flex flex-col gap-[5px] justify-center items-center w-12 h-12 bg-white rounded-full shadow-sm border border-black/5"
          >
            <span className={`w-5 h-0.5 bg-black rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`w-5 h-0.5 bg-black rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-5 h-0.5 bg-black rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[88px] left-4 right-4 bg-white/95 backdrop-blur-xl z-[899] p-4 rounded-3xl shadow-xl border border-black/5 flex flex-col gap-2 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-5 py-3.5 rounded-2xl font-bold text-lg text-gray-900 hover:bg-black/5 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 pb-1 border-t border-black/5 mt-2">
              {/* Also use jellybelly here for mobile if desired, or keep standard */}
              <button
                onClick={() => { setMenuOpen(false); onOpenModal?.(); }}
                className="button-default w-full"
                style={{ display: 'flex' }}
              >
                <div className="button-default__inner" style={{ width: '100%' }}>
                  <span className="button-default__background"></span>
                  <span className="button-default__text text-lg">Get Results</span>
                  <div className="button-default__icon">🔥</div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
