import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import ExpertiseSection from './components/ExpertiseSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] flex flex-col">
      <HeroSection />
      <IntroSection />
      <ExpertiseSection />
    </main>
  );
}
