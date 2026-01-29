import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, Folder, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'ClickSafe',
    description:
      'A security application that detects and identifies fraud websites to protect users from phishing attacks.',
    tech: ['Python', 'Machine Learning', 'Web Security', 'Flask'],
    github: 'https://github.com/Vishalvh117/phishing_detector',
    featured: true,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'VirtualPaint',
    description:
      'An innovative gesture recognition system that allows users to draw and paint using hand gestures.',
    tech: ['Python', 'OpenCV', 'Computer Vision', 'MediaPipe'],
    github: 'https://github.com/Vishalvh117/virtual-paint',
    featured: true,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Industry Monitoring System',
    description:
      'An IoT-based project for real-time monitoring of industrial equipment and environmental conditions.',
    tech: ['IoT', 'Arduino', 'Sensors', 'Dashboard'],
    github: '#',
    featured: true,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Location Web Services',
    description:
      'A web service application providing location-based functionality and geospatial features.',
    tech: ['JavaScript', 'REST API', 'Maps API', 'React'],
    github: '#',
    featured: false,
    gradient: 'from-pink-500 to-purple-500',
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative group cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 5 : 0,
          rotateX: isHovered ? -5 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass-card neon-border rounded-2xl overflow-hidden h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Spotlight effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.15), transparent 40%)`,
          }}
        />
        
        {/* Card Header */}
        <div className="p-6 pb-0 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <motion.div 
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.gradient} p-3`}
              animate={isHovered ? { rotate: 360 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Folder className="w-full h-full text-white" />
            </motion.div>
            <motion.a
              href={project.github}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="View source code"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>

          <motion.h3 
            className="text-xl font-semibold font-display mb-2 group-hover:text-primary transition-colors"
            animate={isHovered ? { x: 5 } : { x: 0 }}
          >
            {project.title}
          </motion.h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="p-6 pt-4 relative z-10">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + techIndex * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={isHovered ? {
            boxShadow: [
              'inset 0 0 20px hsl(var(--primary) / 0)',
              'inset 0 0 20px hsl(var(--primary) / 0.3)',
              'inset 0 0 20px hsl(var(--primary) / 0)',
            ],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">My Work</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" 
          />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A showcase of my work, side projects, and experiments
          </p>
        </motion.div>

        {/* Horizontal scroll for mobile */}
        <div className="relative">
          <motion.button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 glass-card rounded-full hidden md:flex items-center justify-center hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 glass-card rounded-full hidden md:flex items-center justify-center hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, index) => (
              <div key={project.title} className="flex-shrink-0 w-[85vw] md:w-auto snap-center">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Vishalvh117"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="neon" size="lg">
              <Github className="mr-2 h-5 w-5" />
              View All on GitHub
            </Button>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
