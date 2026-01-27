import { useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, Database, Globe, Lightbulb, GitBranch, Sparkles, Zap, Users, Eye, TrendingUp } from 'lucide-react';

const technicalSkills = [
  {
    icon: Code,
    title: 'Java & OOP Fundamentals',
    description: 'Strong understanding of object-oriented concepts, clean code structure, and core Java logic.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Layers,
    title: 'React & Frontend Development',
    description: 'Experience building responsive UI using React, reusable components, and modern JavaScript.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: 'Database & SQL Skills',
    description: 'Ability to design queries, manage data, and work with relational databases.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'Web Technologies',
    description: 'Hands-on experience with HTML, CSS, JavaScript, and basic API integration.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Lightbulb,
    title: 'Problem-Solving Approach',
    description: 'Breaks complex problems into smaller steps and builds logical, efficient solutions.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: GitBranch,
    title: 'Version Control (Git & GitHub)',
    description: 'Comfortable with repositories, commits, and collaborative code management.',
    gradient: 'from-green-500 to-teal-500',
  },
];

const softSkills = [
  {
    icon: Zap,
    title: 'Quick Learner',
    description: 'Adapts fast to new tools, frameworks, and development environments.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Experience working with mentors and teams during internships and projects.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Eye,
    title: 'Attention to Detail',
    description: 'Focuses on writing readable, structured code and improving UI/UX quality.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: TrendingUp,
    title: 'Growth Mindset',
    description: 'Passionate about continuous learning and improving technical depth every day.',
    gradient: 'from-emerald-500 to-green-500',
  },
];

const showcaseItems = [...technicalSkills, ...softSkills];

const HorizontalScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollVelocityRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Scroll multiplier for vertical-to-horizontal conversion
  const SCROLL_MULTIPLIER = 1.2;
  // Friction for smooth deceleration
  const FRICTION = 0.92;
  // Minimum velocity threshold
  const MIN_VELOCITY = 0.5;

  // Card dimensions - must match CSS
  const getCardWidth = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 280 + 16; // w-[280px] + gap-4 (16px)
    }
    return 320 + 24; // w-[320px] + gap-6 (24px)
  };

  // Update active index based on scroll position
  const updateActiveIndex = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = getCardWidth();
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(newIndex, showcaseItems.length - 1)));
  }, []);

  // Smooth momentum scrolling with friction
  const animateMomentum = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (Math.abs(scrollVelocityRef.current) > MIN_VELOCITY) {
      container.scrollLeft += scrollVelocityRef.current;
      scrollVelocityRef.current *= FRICTION;
      rafIdRef.current = requestAnimationFrame(animateMomentum);
    } else {
      scrollVelocityRef.current = 0;
      rafIdRef.current = null;
      // Snap to nearest card when momentum ends
      const cardWidth = getCardWidth();
      const targetIndex = Math.round(container.scrollLeft / cardWidth);
      const targetScroll = targetIndex * cardWidth;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      updateActiveIndex();
    }
  }, [updateActiveIndex]);

  // Smooth scroll to specific position for dot navigation
  const smoothScrollTo = useCallback((targetScroll: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    // Cancel any ongoing momentum
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    scrollVelocityRef.current = 0;
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    updateActiveIndex();
  }, [updateActiveIndex]);

  // Scroll by exactly one card (for keyboard navigation)
  const scrollByOneCard = useCallback((direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Cancel momentum
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    scrollVelocityRef.current = 0;

    const cardWidth = getCardWidth();
    const currentIndex = Math.round(container.scrollLeft / cardWidth);
    const maxIndex = showcaseItems.length - 1;
    
    let newIndex: number;
    if (direction === 'right') {
      newIndex = Math.min(currentIndex + 1, maxIndex);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    const targetScroll = newIndex * cardWidth;
    smoothScrollTo(targetScroll);
  }, [smoothScrollTo]);

  // Handle wheel events - progressive horizontal scrolling
  const handleWheel = useCallback((e: WheelEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Only handle vertical wheel input
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
      return;
    }

    // Check scroll boundaries
    const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth - 1;
    const canScrollLeft = container.scrollLeft > 1;
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    // Only intercept if we can scroll in that direction
    if ((scrollingDown && canScrollRight) || (scrollingUp && canScrollLeft)) {
      e.preventDefault();
      
      // Add to velocity for momentum effect
      scrollVelocityRef.current += e.deltaY * SCROLL_MULTIPLIER;
      
      // Start momentum animation if not already running
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(animateMomentum);
      }
    }
  }, [animateMomentum]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    if (!container.contains(document.activeElement) && document.activeElement !== container) {
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByOneCard('right');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByOneCard('left');
    }
  }, [scrollByOneCard]);

  // Handle scroll end for touch/trackpad to update active index
  const handleScrollEnd = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || rafIdRef.current) return;
    updateActiveIndex();
  }, [updateActiveIndex]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 100);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(scrollTimeout);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleWheel, handleKeyDown, handleScrollEnd]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-12 md:py-16"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-3">
            What I <span className="text-gradient">Bring</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">Scroll to explore my expertise</p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          className="flex gap-4 md:gap-6 px-4 py-2 overflow-x-auto overflow-y-hidden focus:outline-none scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
          }}
        >
          {showcaseItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="flex-shrink-0 w-[280px] md:w-[320px] h-[340px] md:h-[380px] glass-card neon-border rounded-2xl md:rounded-3xl p-5 md:p-6 group cursor-pointer relative"
                style={{ scrollSnapAlign: 'center' }}
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotateZ: 360 }}
                  transition={{ duration: 0.8 }}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.gradient} p-3 md:p-4 mb-4 group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow`}
                >
                  <Icon className="w-full h-full text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-bold font-display mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-4">
                  {item.description}
                </p>

                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '50%' }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`h-0.5 md:h-1 rounded-full bg-gradient-to-r ${item.gradient} mt-4`}
                />

                {/* Sparkle Effect */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-3 right-3 md:top-4 md:right-4 text-primary/30"
                >
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Progress Indicator */}
        <div className="flex justify-center mt-4 gap-1.5">
          {showcaseItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const cardWidth = getCardWidth();
                smoothScrollTo(index * cardWidth);
              }}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-primary/20 hover:bg-primary/50'
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
