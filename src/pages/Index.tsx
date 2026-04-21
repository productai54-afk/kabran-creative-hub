import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Creations from '@/components/Creations';
import Footer from '@/components/Footer';
import GameHUD from '@/components/GameHUD';
import SectionGate from '@/components/SectionGate';
import { GameProvider } from '@/contexts/GameContext';

const Index = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <SectionGate
            sectionId="apropos"
            levelLabel="NIVEAU 1"
            gameTitle="Ramasse les pièces pour découvrir mon profil"
            coinsRequired={5}
          >
            <About />
          </SectionGate>
          <SectionGate
            sectionId="competences"
            levelLabel="NIVEAU 2"
            gameTitle="Collecte les pièces pour voir mes compétences"
            coinsRequired={6}
          >
            <Skills />
          </SectionGate>
          <SectionGate
            sectionId="experiences"
            levelLabel="NIVEAU 3"
            gameTitle="Récupère les pièces pour voir mon parcours"
            coinsRequired={7}
          >
            <Experience />
          </SectionGate>
          <SectionGate
            sectionId="creations"
            levelLabel="NIVEAU 4"
            gameTitle="Attrape les pièces pour voir mes créations"
            coinsRequired={8}
          >
            <Creations />
          </SectionGate>
          <SectionGate
            sectionId="contact"
            levelLabel="NIVEAU FINAL"
            gameTitle="Dernier défi pour me contacter"
            coinsRequired={10}
          >
            <Footer />
          </SectionGate>
        </main>
        <GameHUD />
      </div>
    </GameProvider>
  );
};

export default Index;
