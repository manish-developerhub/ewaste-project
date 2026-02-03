import { Link } from 'react-router-dom';
import { MapPin, Award, BookOpen, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-backgrounddark">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-heading text-xl font-bold">E</span>
              </div>
              <span className="font-heading text-2xl text-secondary-foreground font-bold">
                EcoRecycle
              </span>
            </div>
            <p className="font-paragraph text-base text-secondary-foreground/80 mb-6">
              Making e-waste recycling accessible, transparent, and rewarding for everyone.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-foreground/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-secondary-foreground" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-foreground/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-secondary-foreground" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary-foreground/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-secondary-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl text-secondary-foreground mb-6">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/locations" 
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Find Locations
              </Link>
              <Link 
                to="/rewards" 
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                My Rewards
              </Link>
              <Link 
                to="/guidelines" 
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Guidelines
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-xl text-secondary-foreground mb-6">
              Resources
            </h3>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/guidelines#safety" 
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors"
              >
                Safety Guidelines
              </Link>
              <Link 
                to="/guidelines#disposal" 
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors"
              >
                Disposal Instructions
              </Link>
              <Link 
                to="/rewards#achievements" 
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors"
              >
                Achievement System
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xl text-secondary-foreground mb-6">
              Contact Us
            </h3>
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:support@ecorecycle.com" 
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-3"
              >
                <Mail className="w-5 h-5" />
                support@ecorecycle.com
              </a>
              <a 
                href="tel:+1234567890" 
                className="font-paragraph text-base text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-3"
              >
                <Phone className="w-5 h-5" />
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-secondary-foreground/60">
              © {currentYear} EcoRecycle. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link 
                to="/privacy" 
                className="font-paragraph text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="font-paragraph text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
