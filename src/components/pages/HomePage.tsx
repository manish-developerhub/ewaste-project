// HPI 1.7-V
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { MapPin, Award, BookOpen, Recycle, Zap, TrendingUp, ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- DATA FIDELITY PROTOCOL: CANONICAL DATA SOURCES ---
// These arrays preserve the exact content and logic from the original source code.
const FEATURES_DATA = [
  {
    icon: MapPin,
    title: 'Location Finder',
    description: 'Discover nearby e-waste bins with real-time availability and accepted item types'
  },
  {
    icon: Award,
    title: 'Rewards System',
    description: 'Earn points and unlock achievements for every recycling contribution you make'
  },
  {
    icon: BookOpen,
    title: 'Smart Guidelines',
    description: 'Access detailed disposal instructions and safety information for all e-waste categories'
  }
];

const STATS_DATA = [
  { icon: Recycle, value: '50K+', label: 'Items Recycled' },
  { icon: MapPin, value: '200+', label: 'Active Locations' },
  { icon: Award, value: '15K+', label: 'Achievements Earned' },
  { icon: TrendingUp, value: '98%', label: 'User Satisfaction' }
];

const STEPS_DATA = [
  {
    step: '01',
    title: 'Find a Location',
    description: 'Use our interactive map to locate the nearest e-waste recycling bin.'
  },
  {
    step: '02',
    title: 'Drop Off Items',
    description: 'Bring your electronic waste and deposit it in the appropriate bin.'
  },
  {
    step: '03',
    title: 'Earn Rewards',
    description: 'Track your contributions and unlock achievements as you recycle.'
  }
];

// --- ANIMATION UTILITIES ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export default function HomePage() {
  // Scroll Progress for global effects
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background font-paragraph selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <Header />

      <main>
        {/* --- HERO SECTION --- 
            Replicating the Inspiration Image Structure: 
            50/50 Split, Left White/Text, Right Image, Full Bleed.
        */}
        <section className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden">
          {/* Left Column: Content */}
          <div className="w-full lg:w-1/2 bg-background flex flex-col justify-center px-6 md:px-12 lg:px-20 py-20 lg:py-0 z-10 relative">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-block py-1 px-3 border border-secondary/20 rounded-full text-xs font-bold tracking-widest uppercase text-secondary/60">
                  Sustainable Future
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-secondary leading-[0.95] tracking-tight mb-8">
                Smart <br />
                E-Waste <br />
                Recycling
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="font-paragraph text-lg md:text-xl text-secondary/70 max-w-md mb-10 leading-relaxed">
                Transform electronic waste into rewards with our intelligent bin system. Find locations, track contributions, and earn achievements.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-5">
                <Link to="/locations">
                  <Button className="bg-primary text-white hover:bg-accentbluelight rounded-none h-14 px-10 text-base font-semibold tracking-wide transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40">
                    Find Recycling Bins
                  </Button>
                </Link>
                <Link to="/guidelines">
                  <Button variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-none h-14 px-10 text-base font-semibold tracking-wide transition-all duration-300">
                    Learn Guidelines
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Decorative Elements mimicking the clean lines of the inspiration */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-secondary/5 hidden lg:block" />
            <div className="absolute top-0 right-0 w-px h-full bg-secondary/5 hidden lg:block" />
          </div>

          {/* Right Column: Image (Full Bleed) */}
          <div className="w-full lg:w-1/2 h-[60vh] lg:h-auto relative bg-backgrounddark overflow-hidden">
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10" />
              <Image
                src="https://static.wixstatic.com/media/101688_17d21fb06a114944abce2492ae6e0120~mv2.png?originWidth=1152&originHeight=704"
                alt="Smart e-waste recycling technology"
                className="w-full h-full object-cover"
                width={1200}
              />
            </motion.div>
            
            {/* Floating Badge Element */}
            <motion.div 
              className="absolute bottom-10 right-10 z-20 bg-white p-6 max-w-xs hidden md:block shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-secondary/60">System Active</span>
              </div>
              <p className="font-heading text-2xl font-bold text-secondary">24/7 Monitoring</p>
            </motion.div>
          </div>
        </section>

        {/* --- MARQUEE SECTION --- 
            Dynamic motion to break the static layout.
        */}
        <section className="w-full bg-primary py-6 overflow-hidden border-y border-white/10">
          <div className="flex whitespace-nowrap">
            <motion.div 
              className="flex gap-16 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 opacity-80">
                  <span className="text-white font-heading text-4xl font-bold uppercase tracking-tighter">Recycle</span>
                  <Zap className="w-6 h-6 text-white fill-current" />
                  <span className="text-white font-heading text-4xl font-bold uppercase tracking-tighter">Reward</span>
                  <Globe className="w-6 h-6 text-white" />
                  <span className="text-white font-heading text-4xl font-bold uppercase tracking-tighter">Renew</span>
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- 
            Dark mode, grid layout, high contrast.
        */}
        <section className="w-full bg-backgrounddark py-24 lg:py-32 relative overflow-hidden">
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          
          <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-20">
              <div className="lg:w-1/3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                    Why Choose <br />
                    <span className="text-primary">Our Platform</span>
                  </h2>
                  <div className="h-1 w-20 bg-primary mb-6"></div>
                  <p className="font-paragraph text-lg text-gray-400 leading-relaxed">
                    Comprehensive tools and features designed to make e-waste recycling effortless, transparent, and rewarding for everyone.
                  </p>
                </motion.div>
              </div>

              <div className="lg:w-2/3">
                <div className="grid md:grid-cols-2 gap-6">
                  {FEATURES_DATA.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} index={index} />
                  ))}
                  {/* Extra visual card to balance grid if needed, or just decorative */}
                  <motion.div 
                    className="bg-gradient-to-br from-primary to-accentbluelight p-8 min-h-[280px] flex flex-col justify-between group relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <Recycle className="w-32 h-32 text-white rotate-12" />
                    </div>
                    <h3 className="font-heading text-3xl text-white relative z-10">Join the <br/>Movement</h3>
                    <Link to="/locations" className="relative z-10">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- STICKY PROCESS SECTION --- 
            "How It Works" with sticky left column and scrolling right cards.
        */}
        <section className="w-full bg-background py-24 lg:py-32">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              {/* Sticky Left Column */}
              <div className="lg:w-1/3">
                <div className="sticky top-32">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Process</span>
                    <h2 className="font-heading text-5xl md:text-6xl text-secondary mb-8">
                      How It <br />Works
                    </h2>
                    <p className="font-paragraph text-xl text-secondary/70 mb-8">
                      Get started with our simple three-step process to make a difference.
                    </p>
                    <Link to="/guidelines">
                      <Button variant="link" className="text-primary p-0 text-lg font-semibold hover:no-underline group">
                        Read full guidelines 
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Scrolling Right Column */}
              <div className="lg:w-2/3 flex flex-col gap-12 lg:gap-24 pt-12 lg:pt-0">
                {STEPS_DATA.map((step, index) => (
                  <StepCard key={index} step={step} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- STATS SECTION (PARALLAX) --- 
            Large scale typography and impact metrics.
        */}
        <section className="w-full bg-secondary text-white py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/101688_de68d80fc9294a52b1f84f34c574dc9f~mv2.png?originWidth=1152&originHeight=768')] bg-cover bg-center opacity-10 mix-blend-overlay fixed-bg-hack"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary via-transparent to-secondary"></div>
          
          <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="text-center mb-20">
              <motion.h2 
                className="font-heading text-4xl md:text-6xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Making an Impact Together
              </motion.h2>
              <motion.p 
                className="font-paragraph text-lg text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Join thousands of users who are contributing to a cleaner environment through responsible e-waste disposal.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t border-white/10 pt-16">
              {STATS_DATA.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors duration-300">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white">
                    {stat.value}
                  </div>
                  <div className="font-paragraph text-sm md:text-base text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-20 text-center">
               <Link to="/rewards">
                <Button className="bg-white text-secondary hover:bg-gray-200 rounded-none h-14 px-12 text-base font-bold tracking-wide">
                  View My Rewards
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- 
            High contrast, centered, final call to action.
        */}
        <section className="w-full bg-primary py-24 lg:py-32 relative overflow-hidden">
          {/* Abstract Shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Zap className="w-20 h-20 text-white mx-auto mb-8" />
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight">
                Ready to Start <br />Recycling?
              </h2>
              <p className="font-paragraph text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                Join our community and make a positive environmental impact today. Every item counts towards a greener future.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/locations">
                  <Button className="bg-white text-primary hover:bg-gray-100 rounded-none h-16 px-10 text-lg font-bold w-full sm:w-auto shadow-xl">
                    Explore Locations
                  </Button>
                </Link>
                <Link to="/guidelines">
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent rounded-none h-16 px-10 text-lg font-bold w-full sm:w-auto">
                    View Guidelines
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// --- SUB-COMPONENTS FOR PERFORMANCE & CLEANLINESS ---

function FeatureCard({ feature, index }: { feature: any, index: number }) {
  return (
    <motion.div
      className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <feature.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
      <h3 className="font-heading text-2xl text-white mb-4 group-hover:text-primary transition-colors">
        {feature.title}
      </h3>
      <p className="font-paragraph text-gray-400 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

function StepCard({ step, index }: { step: any, index: number }) {
  // Using a ref here is safe because the component is unconditionally rendered in the map
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="flex gap-6 md:gap-10 group"
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="flex-shrink-0">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-background border-2 border-secondary flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
          <span className="font-heading text-2xl md:text-4xl font-bold text-secondary group-hover:text-white relative z-10 transition-colors duration-500">
            {step.step}
          </span>
        </div>
        {index !== 2 && (
          <div className="w-0.5 h-full bg-secondary/10 mx-auto mt-4 min-h-[100px]"></div>
        )}
      </div>
      <div className="pt-2 md:pt-4">
        <h3 className="font-heading text-3xl md:text-4xl text-secondary mb-4 group-hover:text-primary transition-colors duration-300">
          {step.title}
        </h3>
        <p className="font-paragraph text-lg text-secondary/70 max-w-md leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}