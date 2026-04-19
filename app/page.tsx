import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import ExpertiseSection from './components/ExpertiseSection';
import SelectedWork from './components/SelectedWork';
import BrandsSection from './components/BrandsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] flex flex-col" suppressHydrationWarning={true}>
      <HeroSection />
      <IntroSection />
      <ExpertiseSection />
      <SelectedWork />
      <BrandsSection />
    </main>
  );
}
