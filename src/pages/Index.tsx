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
          <SectionGate sectionId="apropos" gameType="quiz" gameTitle="Répondez au quiz pour découvrir mon profil">
            <About />
          </SectionGate>
          <SectionGate sectionId="competences" gameType="memory" gameTitle="Trouvez les paires pour voir mes compétences">
            <Skills />
          </SectionGate>
          <SectionGate sectionId="experiences" gameType="sequence" gameTitle="Reproduisez la séquence pour voir mon parcours">
            <Experience />
          </SectionGate>
          <SectionGate sectionId="creations" gameType="puzzle" gameTitle="Résolvez le puzzle pour voir mes créations">
            <Creations />
          </SectionGate>
          <SectionGate sectionId="contact" gameType="code" gameTitle="Entrez le code secret pour me contacter">
            <Footer />
          </SectionGate>
        </main>
        <GameHUD />
      </div>
    </GameProvider>
  );
};

export default Index;
