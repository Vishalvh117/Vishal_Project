import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
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

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'vishal.k.tec@gmail.com',
    href: 'mailto:vishal.k.tec@gmail.com',
    confirmMessage: 'You are being redirected to send an email. Do you want to continue?',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Hyderabad, India',
    href: 'https://www.google.com/maps/search/?api=1&query=Hyderabad,India',
    external: true,
    confirmMessage: 'You are being redirected to Google Maps. Continue?',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9742209117',
    href: 'tel:+919742209117',
    confirmMessage: 'You are being redirected to make a call. Continue?',
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Vishalvh117', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/vishal-haveli-3119371b0/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/Vishal_09117', label: 'Twitter' },
];

const openGmailComposeFromMailto = (mailtoHref: string) => {
  // Try to open Gmail Web Compose reliably (works even if mailto handler isn't set).
  // Falls back to the original mailto navigation if parsing fails.
  try {
    const mailtoUrl = new URL(mailtoHref);
    const to = mailtoUrl.pathname;
    const subject = mailtoUrl.searchParams.get('subject') ?? '';
    const body = mailtoUrl.searchParams.get('body') ?? '';

    const gmailUrl = new URL('https://mail.google.com/mail/');
    gmailUrl.searchParams.set('view', 'cm');
    gmailUrl.searchParams.set('fs', '1');
    if (to) gmailUrl.searchParams.set('to', to);
    if (subject) gmailUrl.searchParams.set('su', subject);
    if (body) gmailUrl.searchParams.set('body', body);

    // Must run synchronously inside the click handler, otherwise popup blockers may stop it.
    const opened = window.open(gmailUrl.toString(), '_blank', 'noopener,noreferrer');
    if (!opened) {
      window.location.href = mailtoHref;
    }
  } catch {
    window.location.href = mailtoHref;
  }
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ href: string; external?: boolean } | null>(null);

  const handleContactClick = useCallback((item: typeof contactInfo[0]) => {
    setPendingAction({ href: item.href, external: item.external });
    setDialogOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    if (pendingAction) {
      const { href, external } = pendingAction;

      // IMPORTANT: navigate synchronously inside the click handler
      // (async delays like setTimeout can trigger popup blockers).
      if (href.startsWith('mailto:')) {
        openGmailComposeFromMailto(href);
      } else if (href.startsWith('tel:')) {
        window.location.href = href;
      } else if (external) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }

      setDialogOpen(false);
      setPendingAction(null);
    }
  }, [pendingAction]);

  const handleCancel = useCallback(() => {
    setDialogOpen(false);
    setPendingAction(null);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!dialogOpen) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        handleConfirm();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dialogOpen, handleConfirm, handleCancel]);

  const getConfirmMessage = () => {
    if (!pendingAction) return '';
    const item = contactInfo.find(c => c.href === pendingAction.href);
    return item?.confirmMessage || '';
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleContactClick(item)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer w-full text-left"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors pointer-events-none">
                    <item.icon className="w-5 h-5 text-primary pointer-events-none" />
                  </div>
                  <div className="pointer-events-none">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="text-sm text-muted-foreground">Find me on:</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                  >
                    <social.icon className="w-5 h-5 pointer-events-none" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setPendingAction(null);
        }}
      >
        <AlertDialogContent className="glass-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Confirm Redirect</AlertDialogTitle>
            <AlertDialogDescription>
              {getConfirmMessage()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ContactSection;
