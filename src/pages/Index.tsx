import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import ParallaxSection from '@/components/ParallaxSection';
import AnimatedCursor from '@/components/AnimatedCursor';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AnimatedCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <HorizontalScrollSection />
        <SkillsSection />
        <ParallaxSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
