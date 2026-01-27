import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl"
      />
      <motion.div
        style={{ y: y2, rotate }}
        className="absolute top-40 right-20 w-24 h-24 border-4 border-primary/30 rounded-lg"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 blur-2xl"
      />
      <motion.div
        style={{ scale }}
        className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl opacity-30"
      />

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold font-display mb-6"
          >
            Building the{' '}
            <span className="text-gradient">Future</span>
            <br />
            One Line at a Time
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Passionate about transforming ideas into reality through elegant code
            and innovative solutions.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { value: '3+', label: 'Major Projects' },
              { value: '4+', label: 'Languages' },
              { value: '200+', label: 'Hours of Coding' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    delay: 0.8 + index * 0.1,
                  }}
                  className="text-4xl md:text-5xl font-bold text-neon-cyan mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxSection;
