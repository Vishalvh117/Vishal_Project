import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Database, Globe, Palette, Server, Smartphone, Zap } from 'lucide-react';

const skills = [
  {
    category: 'Languages',
    icon: Code2,
    items: [
      { name: 'Java', level: 90 },
      { name: 'Python', level: 75 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 70 },
    ],
  },
  {
    category: 'Frontend',
    icon: Globe,
    items: [
      { name: 'React', level: 85 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'Next.js', level: 65 },
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    items: [
      { name: 'Node.js', level: 70 },
      { name: 'Spring Boot', level: 75 },
      { name: 'REST APIs', level: 85 },
      { name: 'Express.js', level: 70 },
    ],
  },
  {
    category: 'Database',
    icon: Database,
    items: [
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 70 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Redis', level: 60 },
    ],
  },
  {
    category: 'Tools',
    icon: Palette,
    items: [
      { name: 'Git', level: 85 },
      { name: 'Docker', level: 65 },
      { name: 'VS Code', level: 90 },
      { name: 'Linux', level: 70 },
    ],
  },
  {
    category: 'Other',
    icon: Smartphone,
    items: [
      { name: 'DSA', level: 80 },
      { name: 'System Design', level: 65 },
      { name: 'Agile/Scrum', level: 75 },
      { name: 'Problem Solving', level: 90 },
    ],
  },
];

const CircularProgress = ({ level, delay }: { level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div ref={ref} className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-muted/30"
        />
        <motion.circle
          cx="48"
          cy="48"
          r="40"
          stroke="url(#gradient)"
          strokeWidth="6"
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, delay, ease: 'easeOut' }}
          style={{ strokeDasharray: circumference }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: delay + 0.5 }}
        className="absolute inset-0 flex items-center justify-center text-lg font-bold"
      >
        {level}%
      </motion.div>
    </div>
  );
};

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      ref={ref} 
      className="space-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 5 }}
    >
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium flex items-center gap-2">
          {name}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          >
            <Zap className="w-3 h-3 text-primary" />
          </motion.span>
        </span>
        <motion.span 
          className="text-muted-foreground"
          animate={isHovered ? { color: 'hsl(var(--primary))' } : {}}
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-progress relative overflow-hidden">
        <motion.div
          className="skill-progress-bar"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            delay: delay + 1,
          }}
        />
      </div>
    </motion.div>
  );
};

const SkillCard = ({ category, categoryIndex, isInView }: { 
  category: typeof skills[0]; 
  categoryIndex: number;
  isInView: boolean;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
      className="relative h-[320px] cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 glass-card neon-border p-6 rounded-2xl group"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div 
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary p-2"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <category.icon className="w-full h-full text-primary-foreground" />
            </motion.div>
            <h3 className="text-xl font-semibold font-display">{category.category}</h3>
          </div>

          <div className="space-y-4">
            {category.items.map((skill, skillIndex) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={0.2 + skillIndex * 0.1}
              />
            ))}
          </div>
          
          <motion.span 
            className="absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to flip
          </motion.span>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 glass-card neon-border p-6 rounded-2xl flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <motion.div 
            className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary p-3 mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <category.icon className="w-full h-full text-primary-foreground" />
          </motion.div>
          <h3 className="text-2xl font-bold font-display mb-4 text-gradient">{category.category}</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {category.items.map((skill) => (
              <motion.span
                key={skill.name}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm border border-primary/30"
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[150px]" />
      
      {/* Animated grid lines */}
      <motion.div
        className="absolute inset-0 grid-pattern opacity-10"
        animate={{ 
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
          >
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary">My Expertise</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" 
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
          >
            Technologies and tools I work with to bring ideas to life
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, categoryIndex) => (
            <SkillCard
              key={category.category}
              category={category}
              categoryIndex={categoryIndex}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
