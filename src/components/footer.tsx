import { MessageCircle, AtSign, Code2 } from 'lucide-react';
import Image from 'next/image';

const LINKS = {
  'Services': ['Mobile Apps', 'Web Platforms', 'Digitization', 'API Development', 'UI/UX Design'],
  'Company':  ['About Us', 'Our Process', 'Careers', 'Press', 'Contact'],
  'Legal':    ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const SOCIALS = [
  { icon: MessageCircle, label: 'Twitter/X', href: '#' },
  { icon: AtSign,        label: 'LinkedIn',  href: '#' },
  { icon: Code2,         label: 'GitHub',    href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-background overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                <Image src="/logo-light.png" alt="Mindivo Logo" width={48} height={48} className="object-cover w-full h-full dark:invert" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-foreground">Mind</span>
                <span className="text-primary">ivo</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              US-based software company building mobile apps, web platforms, and digital transformations
              for forward-thinking businesses.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border/50 bg-card/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/60 hover:border-primary/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Mindivo LLC. All rights reserved. Built in the United States 🇺🇸
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
