'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Observer);
}

const BRANDS = [
  { src: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/69241146b4df63c4ca966552_Bullit%20Digital.svg', alt: 'Bullit Digital' },
  { src: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/68c194e6d1b186563459b107_morssinkhof.svg', alt: 'Morssinkhof' },
  { src: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d88f755388cc2c74ecff_salontopper.svg', alt: 'Salontopper' },
  { src: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d880bed5996600cbc586_seesing-flex.svg', alt: 'Seesing Flex' },
  { src: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d86cd6ba384af3c14e58_graafschap-college.svg', alt: 'Graafschap College' },
  { src: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d85341bf0d7476e56a8c_fides.svg', alt: 'Fides' },
  { src: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d838fc5735f090bd9843_SRHK.svg', alt: 'SRHK' },
  { src: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/6849d81e72e08110e3fd1a17_knltb.svg', alt: 'KNLTB' },
  { src: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/684b062ebc242028ca4b3ea1_tho.svg', alt: 'THO' },
  { src: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/684c05642bf8f5cea7384403_de-talententuin.svg', alt: 'De Talententuin' },
  { src: 'https://cdn.prod.website-files.com/6848603da8e6ac95794b74a9/68c1952f22281ee50d3620b5_zclv.svg', alt: 'ZCLV' },
];

export default function BrandsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let total = 0;
    const content = trackRef.current;
    if (!content) return;

    // Use selector relative to the container
    const cards = gsap.utils.toArray<HTMLElement>('.brand-card', content);
    
    // Half of the cards array length corresponds to the original set
    const cardsLength = BRANDS.length;
    
    // Wait until layout finishes, so `content.clientWidth` is fully calculated
    // using requestAnimationFrame ensures we get the painted width
    requestAnimationFrame(() => {
      const half = content.clientWidth / 2;
      const wrap = gsap.utils.wrap(-half, 0);

      const xTo = gsap.quickTo(content, "x", {
        duration: 0.5,
        ease: 'power3',
        modifiers: { x: gsap.utils.unitize(wrap) },
      });

      const itemValues: number[] = [];
      for (let i = 0; i < cardsLength; i++) {
        itemValues.push((Math.random() - 0.5) * 20);
      }

      const tl = gsap.timeline({ paused: true });
      tl.to(cards, {
        rotate: (index) => itemValues[index % cardsLength],
        xPercent: (index) => itemValues[index % cardsLength],
        yPercent: (index) => itemValues[index % cardsLength],
        scale: 0.95,
        duration: 0.5,
        ease: 'back.inOut(3)',
      });

      Observer.create({
        target: content,
        type: "pointer,touch",
        onPress: () => tl.play(),
        onDrag: (self) => {
          total += self.deltaX;
          xTo(total);
        },
        onRelease: () => tl.reverse(),
        onStop: () => tl.reverse(),
      });

      function tick(time: number, deltaTime: number) {
        total -= deltaTime / 10;
        xTo(total);
      }
      gsap.ticker.add(tick);
      
      // We must specify cleanup for ticker in useGSAP return or just let useGSAP handle the scope.
      // useGSAP cleans up all gsap tweens/ScrollTriggers/Observers but might miss raw ticker adds if not careful.
      // Let's manually remove tick later.
      return () => {
        gsap.ticker.remove(tick);
      };
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#FAF4EC] overflow-hidden" suppressHydrationWarning>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12" suppressHydrationWarning>
        <div className="mb-14">
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#161616] max-w-[400px]">
            These brands<br />got hyped.
          </h2>
        </div>
        
        <div className="w-full cursor-grab select-none overflow-visible" suppressHydrationWarning>
        <div 
          ref={trackRef} 
          className="flex flex-nowrap w-max gap-6 md:gap-[2vw] pr-[2vw]"
          suppressHydrationWarning
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={i} className="brand-card shrink-0" suppressHydrationWarning>
              <div className="w-[200px] h-[140px] md:w-[22vw] md:h-[15vw] lg:w-[20vw] lg:h-[13vw] bg-transparent border border-black/5 rounded-xl md:rounded-2xl flex items-center justify-center p-0 transition-transform duration-300 pointer-events-none" suppressHydrationWarning>
                <div className="relative w-full h-full flex items-center justify-center overflow-visible" suppressHydrationWarning>
                  <img 
                    src={brand.src} 
                    alt={brand.alt} 
                    className="w-full h-full object-contain scale-[1.4]" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
