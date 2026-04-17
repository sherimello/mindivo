'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const HOME_NAV_LINKS = [
  { label: 'Services',    href: '#services'  },
  { label: 'How We Work', href: '#process'   },
  { label: 'Portfolio',   href: '#portfolio' },
  { label: 'Contact',     href: '#contact'   },
];

const PROJECT_NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Gallery',  href: '#gallery'  },
  { label: 'Results',  href: '#results'  },
  { label: 'Process',  href: '#process'  },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const pathname    = usePathname();
  const router      = useRouter();
  const isProjectPage = /^\/projects\/.+/.test(pathname);
  const navLinks    = isProjectPage ? PROJECT_NAV_LINKS : HOME_NAV_LINKS;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);

      if (currentScrollY > lastScrollY && currentScrollY > 64) {
        setIsVisible(false);
        setMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);

    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (!isProjectPage) {
        // On homepage but section not yet rendered — shouldn't happen, but guard.
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }
  };

  const handleCtaClick = () => {
    setMenuOpen(false);
    if (isProjectPage) {
      // Navigate to homepage contact section
      router.push('/#contact');
    } else {
      handleNav('#contact');
    }
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/20'
        : 'bg-transparent',
      isVisible ? 'translate-y-0' : '-translate-y-full'
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
            <Image src="/logo-light.png" alt="Mindivo Logo" width={48} height={48} className="object-cover w-full h-full dark:invert" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-foreground">Mind</span>
            <span className="text-primary">ivo</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Back link — only on project pages */}
          {isProjectPage && (
            <Link
              href="/#portfolio"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Projects
            </Link>
          )}

          <ul className="flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => handleNav(href)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-200"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 border-l border-border/50 pl-6">
            <ThemeToggle />
            <button
              onClick={handleCtaClick}
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isProjectPage ? 'Work With Us' : 'Start a Project'}
            </button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="bg-background/95 backdrop-blur-xl border-b border-border/50 px-4 pb-4 pt-2 space-y-1">
          {isProjectPage && (
            <Link
              href="/#portfolio"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Projects
            </Link>
          )}
          {navLinks.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNav(href)}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all"
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleCtaClick}
            className="w-full mt-2 px-4 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            {isProjectPage ? 'Work With Us' : 'Start a Project'}
          </button>
        </div>
      </div>
    </header>
  );
}
