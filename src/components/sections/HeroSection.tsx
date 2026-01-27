import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterEffect from '@/components/TypewriterEffect';
import AnimatedBackground from '@/components/AnimatedBackground';
import FloatingGeometry from '@/components/FloatingGeometry';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const HeroSection = () => {
  const roles = ['Java Developer', 'Web Developer', 'Problem Solver'];
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const emailAddress = 'vishal.k.tec@gmail.com';

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient-bg"
    >
      <AnimatedBackground />
      <FloatingGeometry />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] animate-float" style={{ animationDelay: '3s' }} />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card px-4 py-2 rounded-full border border-primary/30"
          >
            <span className="text-sm text-muted-foreground">
              ✨ Available for opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight">
              Hi, I'm{' '}
              <span className="text-neon-cyan">Vishal Haveli</span>
            </h1>
            <div className="text-2xl md:text-4xl lg:text-5xl font-semibold font-display h-14 md:h-16">
              <TypewriterEffect words={roles} />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
          >
            Crafting elegant solutions through code. Passionate about building
            scalable applications and solving complex problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              variant="gradient"
              size="xl"
              onClick={() => scrollToSection('projects')}
              className="group"
            >
              View Projects
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button
              variant="neon"
              size="xl"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-6 pt-8"
          >
            {[
              { icon: Github, href: 'https://github.com/Vishalvh117', label: 'GitHub', isExternal: true },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/vishal-haveli-3119371b0/', label: 'LinkedIn', isExternal: true },
              { icon: Mail, href: '#', label: 'Email', isExternal: false, isEmail: true },
            ].map(({ icon: Icon, href, label, isExternal, isEmail }) => (
              <a
                key={label}
                href={isEmail ? undefined : href}
                aria-label={label}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onClick={isEmail ? (e) => { e.preventDefault(); setShowEmailDialog(true); } : undefined}
                className="social-icon p-3 glass-card rounded-full text-muted-foreground hover:text-primary cursor-pointer"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Email Confirmation Dialog */}
        <AlertDialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Open Email Client?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to send an email to <strong className="text-foreground">{emailAddress}</strong>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => window.location.href = `mailto:${emailAddress}`}>
                Open Mail
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
