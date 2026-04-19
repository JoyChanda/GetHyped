import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import ExpertiseSection from './components/ExpertiseSection';
import SelectedWork from './components/SelectedWork';
import BrandsSection from './components/BrandsSection';
import FooterSection from './components/FooterSection';


export default function Home() {
  return (
    <div className="bg-[#EAE4D8] overflow-x-hidden" suppressHydrationWarning={true}>
      <main className="min-h-screen bg-[#f7f2ea] flex flex-col relative z-20 shadow-[0px_10px_30px_rgba(0,0,0,0.1)]">
        <HeroSection />
        <IntroSection />
        <ExpertiseSection />
        <SelectedWork />
        <BrandsSection />
      </main>
      <FooterSection />
    </div>
  );
}
