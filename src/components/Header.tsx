import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Award, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/locations', label: 'Locations', icon: MapPin },
    { href: '/rewards', label: 'My Rewards', icon: Award },
    { href: '/guidelines', label: 'Guidelines', icon: BookOpen }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-background border-b border-secondary/10 sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-heading text-xl font-bold">E</span>
            </div>
            <span className="font-heading text-2xl text-secondary font-bold hidden sm:block">
              EcoRecycle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-paragraph text-base transition-colors flex items-center gap-2 ${
                  isActive(link.href)
                    ? 'text-primary font-semibold'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link to="/locations">
              <Button className="bg-primary text-primary-foreground hover:bg-accentbluelight h-11 px-6 font-paragraph">
                Find Bins
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-t border-secondary/10"
          >
            <nav className="px-8 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-paragraph text-base transition-colors flex items-center gap-3 py-2 ${
                    isActive(link.href)
                      ? 'text-primary font-semibold'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <Link to="/locations" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-accentbluelight h-11 font-paragraph mt-2">
                  Find Bins
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
