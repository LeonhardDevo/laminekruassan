import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { Anatomy } from './components/Anatomy';
import { CoffeeBar } from './components/CoffeeBar';
import { Craft } from './components/Craft';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Manifesto, Marquee } from './components/Manifesto';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { Reserve } from './components/Reserve';
import { Salon } from './components/Salon';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const finish = useCallback(() => setLoading(false), []);

  return (
    <div className="grain relative min-h-screen bg-noir text-cream">
      <AnimatePresence>{loading && <Preloader onDone={finish} />}</AnimatePresence>

      <Navbar />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <Manifesto />
        <Craft />
        <Anatomy />
        <MenuSection />
        <CoffeeBar />
        <Salon />
        <Reserve />
      </main>
      <Footer />
    </div>
  );
};

export default App;
