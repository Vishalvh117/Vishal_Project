import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'React Developer',
    organization: 'SKAWSH',
    location: 'Remote',
    period: 'Sep 2024 – Present',
    description:
      'Worked on building and enhancing responsive user interfaces using React. Focused on component-based development, state management basics, UI optimization, and integrating frontend with APIs.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
  },
  {
    type: 'work',
    title: 'Software Development Intern',
    organization: 'Giga Skill Technology',
    location: 'Bangalore',
    period: '3 Months',
    description:
      'Worked on Java-based and web applications, strengthened OOP concepts, improved problem-solving skills, and learned real-world development practices under mentorship.',
    skills: ['Java', 'SQL', 'OOP', 'Web Basics', 'Git'],
  },
  {
    type: 'education',
    title: 'Master of Computer Applications (MCA)',
    organization: 'Nitte Meenakshi Institute of Technology',
    location: 'Bangalore',
    period: '2022 – 2024',
    description:
      'Completed MCA with focus on software development and computer science fundamentals. CGPA: 7.8',
    skills: ['Java', 'Data Structures', 'DBMS', 'Operating Systems', 'Web Technologies'],
  },
  {
    type: 'education',
    title: 'Bachelor of Science (BSc)',
    organization: 'Gulbarga University',
    location: 'Karnataka',
    period: '2018 – 2021',
    description:
      'Completed undergraduate studies in Science stream (PCM + Computer Science) with strong foundation in mathematics and programming basics.',
    skills: ['Mathematics', 'Computer Science', 'Physics', 'Programming Basics'],
  },
];

const TimelineCard = ({
  item,
  index,
}: {
  item: (typeof experiences)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isWork = item.type === 'work';
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-center justify-center">
      {/* Timeline connector line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
        <div className="h-full w-full bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50 opacity-50" />
        <div className="absolute inset-0 w-full bg-gradient-to-b from-primary via-secondary to-primary blur-sm opacity-30" />
      </div>

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-1/2 -translate-x-1/2 z-10"
      >
        <div className="relative">
          <div
            className={`w-4 h-4 rounded-full ${
              isWork
                ? 'bg-gradient-to-br from-primary to-neon-blue'
                : 'bg-gradient-to-br from-secondary to-neon-pink'
            }`}
          />
          <div
            className={`absolute inset-0 rounded-full blur-md ${
              isWork ? 'bg-primary/60' : 'bg-secondary/60'
            }`}
          />
          <div
            className={`absolute -inset-2 rounded-full animate-pulse ${
              isWork ? 'bg-primary/20' : 'bg-secondary/20'
            }`}
          />
        </div>
      </motion.div>

      {/* Card container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Left spacer or card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`${isLeft ? 'block' : 'hidden md:block'} ${
            isLeft ? '' : 'md:opacity-0 md:pointer-events-none'
          }`}
        >
          {isLeft && (
            <div className="group relative overflow-hidden">
              {/* Glow effect */}
              <div
                className={`absolute -inset-0.5 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${
                  isWork
                    ? 'bg-gradient-to-r from-primary to-neon-blue'
                    : 'bg-gradient-to-r from-secondary to-neon-pink'
                }`}
              />

              {/* Card */}
              <div className="relative glass-card backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isWork
                        ? 'bg-gradient-to-br from-primary/20 to-neon-blue/20 border border-primary/30'
                        : 'bg-gradient-to-br from-secondary/20 to-neon-pink/20 border border-secondary/30'
                    }`}
                  >
                    {isWork ? (
                      <Briefcase className={`w-6 h-6 ${isWork ? 'text-primary' : 'text-secondary'}`} />
                    ) : (
                      <GraduationCap className={`w-6 h-6 ${isWork ? 'text-primary' : 'text-secondary'}`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold font-display text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.organization}</p>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/30 border border-white/5">
                    <Calendar className="w-3 h-3" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/30 border border-white/5">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-all duration-300 hover:scale-105 ${
                        isWork
                          ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:shadow-[0_0_10px_rgba(var(--primary),0.3)]'
                          : 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 hover:shadow-[0_0_10px_rgba(var(--secondary),0.3)]'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right spacer or card */}
        <motion.div
          ref={!isLeft ? ref : undefined}
          initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`${!isLeft ? 'block' : 'hidden md:block'} ${
            !isLeft ? '' : 'md:opacity-0 md:pointer-events-none'
          }`}
        >
          {!isLeft && (
            <div className="group relative overflow-hidden">
              {/* Glow effect */}
              <div
                className={`absolute -inset-0.5 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${
                  isWork
                    ? 'bg-gradient-to-r from-primary to-neon-blue'
                    : 'bg-gradient-to-r from-secondary to-neon-pink'
                }`}
              />

              {/* Card */}
              <div className="relative glass-card backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isWork
                        ? 'bg-gradient-to-br from-primary/20 to-neon-blue/20 border border-primary/30'
                        : 'bg-gradient-to-br from-secondary/20 to-neon-pink/20 border border-secondary/30'
                    }`}
                  >
                    {isWork ? (
                      <Briefcase className={`w-6 h-6 ${isWork ? 'text-primary' : 'text-secondary'}`} />
                    ) : (
                      <GraduationCap className={`w-6 h-6 ${isWork ? 'text-primary' : 'text-secondary'}`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold font-display text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.organization}</p>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/30 border border-white/5">
                    <Calendar className="w-3 h-3" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/30 border border-white/5">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-all duration-300 hover:scale-105 ${
                        isWork
                          ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:shadow-[0_0_10px_rgba(var(--primary),0.3)]'
                          : 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 hover:shadow-[0_0_10px_rgba(var(--secondary),0.3)]'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px]" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 mb-4"
          >
            My Journey
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional experience and academic achievements
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
          </div>

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((item, index) => (
              <TimelineCard key={`${item.title}-${index}`} item={item} index={index} />
            ))}
          </div>

          {/* Timeline end marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-8 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary items-center justify-center"
          >
            <div className="w-3 h-3 rounded-full bg-background" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
