import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, Eye, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const certifications = [
  {
    title: 'GIGA Skill Technology',
    issuer: 'IndoSkill Pvt Ltd',
    icon: '🤖',
    certificateUrl: '/certificates/giga-skill.png',
    type: 'image',
  },
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    icon: '☁️',
    certificateUrl: '/certificates/cloud-computing.png',
    type: 'image',
  },
  {
    title: 'Introduction to Career Skills in Data Analytics',
    issuer: 'LinkedIn Learning',
    icon: '📊',
    certificateUrl: '/certificates/data-analytics.jpg',
    type: 'image',
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[200px]" />

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
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Achievements</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            My <span className="text-gradient">Certifications</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full origin-left"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass-card neon-border p-6 rounded-2xl group cursor-pointer relative"
            >
              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                  {cert.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold font-display mb-1 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <span>Issued by </span>
                    <span className="text-primary font-medium">{cert.issuer}</span>
                  </p>
                </div>

                {/* Eye Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert(cert);
                  }}
                  className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">View Certificate</span>
                </motion.button>
              </div>

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 30px hsl(var(--primary) / 0.15)',
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-background/95 backdrop-blur-xl border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-display flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              {selectedCert?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedCert?.type === 'image' ? (
              <img
                src={selectedCert.certificateUrl}
                alt={selectedCert.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            ) : (
              <iframe
                src={selectedCert?.certificateUrl}
                className="w-full h-[70vh] rounded-lg border border-border"
                title={selectedCert?.title}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CertificationsSection;
