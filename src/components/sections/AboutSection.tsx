import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, Trophy, Briefcase, Sparkles } from 'lucide-react';

const stats = [
  {
    icon: GraduationCap,
    label: 'Degree',
    value: 'MCA',
    color: 'from-primary to-neon-blue',
  },
  {
    icon: Calendar,
    label: 'Graduation',
    value: '2024',
    color: 'from-neon-purple to-neon-pink',
  },
  {
    icon: Trophy,
    label: 'CGPA',
    value: '7.8',
    color: 'from-neon-blue to-primary',
  },
  {
    icon: Briefcase,
    label: 'Location',
    value: 'Hyderabad',
    color: 'from-neon-pink to-neon-purple',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-[200px]" />
      
      {/* Floating decorative elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-20 w-20 h-20 border-2 border-primary/20 rounded-xl opacity-50"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-32 left-16 w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-sm"
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
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Get to know me</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full origin-left" 
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotateY: -10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            className="space-y-6"
            style={{ perspective: '1000px' }}
          >
            <motion.div 
              className="glass-card p-8 rounded-2xl relative overflow-hidden group"
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Animated border gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(45deg, transparent, hsl(var(--primary) / 0.1), transparent)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground leading-relaxed relative z-10"
              >
                Hi, I'm <span className="text-primary font-medium">Vishal</span> 👋 I'm an MCA graduate (2024) and a Java-focused software developer who enjoys building simple, reliable, and practical applications.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="text-lg text-muted-foreground leading-relaxed mt-4 relative z-10"
              >
                I have hands-on experience with <span className="text-primary font-medium">Java</span>, <span className="text-secondary font-medium">SQL</span>, JavaScript, and React. I've worked on projects like Virtual Paint and a Smart Attendance System using Face Recognition, which helped me strengthen my logic and development skills.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed mt-4 relative z-10"
              >
                I've gained industry exposure through internships at <span className="text-primary font-medium">Giga Skill Technology</span> and <span className="text-secondary font-medium">Skawsh</span>. I'm eager to keep learning, improve my Java skills, and grow as a developer in a collaborative environment.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: 5,
                  rotateX: 5,
                  z: 50,
                }}
                className="glass-card neon-border p-6 rounded-2xl group cursor-pointer"
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3 mb-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-full h-full text-primary-foreground" />
                </motion.div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <motion.p 
                  className="text-2xl font-bold font-display"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {stat.value}
                </motion.p>
                
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 30px hsl(var(--primary) / 0.2)',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
