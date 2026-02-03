import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, AlertTriangle, CheckCircle, Info, Search } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { EWasteGuidelines } from '@/entities';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GuidelinesPage() {
  const [guidelines, setGuidelines] = useState<EWasteGuidelines[]>([]);
  const [filteredGuidelines, setFilteredGuidelines] = useState<EWasteGuidelines[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const LIMIT = 50;

  useEffect(() => {
    loadGuidelines();
  }, [skip]);

  useEffect(() => {
    filterGuidelines();
  }, [guidelines, searchQuery]);

  const loadGuidelines = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<EWasteGuidelines>('ewasteguidelines', {}, { limit: LIMIT, skip });
      setGuidelines(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Failed to load guidelines:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterGuidelines = () => {
    if (searchQuery) {
      const filtered = guidelines.filter(guide =>
        guide.categoryName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.categoryDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.identificationTips?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGuidelines(filtered);
    } else {
      setFilteredGuidelines(guidelines);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-primary py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <BookOpen className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h1 className="font-heading text-5xl md:text-6xl text-primary-foreground mb-6">
              E-Waste Disposal Guidelines
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90">
              Learn how to properly identify, handle, and dispose of electronic waste safely
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full bg-background py-8 border-b border-secondary/10">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/40" />
            <Input
              type="text"
              placeholder="Search by category, description, or tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 font-paragraph"
            />
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section id="safety" className="w-full bg-backgrounddark py-12">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-destructive/10 border-2 border-destructive rounded-lg p-8"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-2xl text-secondary mb-3">
                  Important Safety Information
                </h3>
                <ul className="space-y-2">
                  <li className="font-paragraph text-base text-secondary/80 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    Always remove batteries before disposing of electronic devices
                  </li>
                  <li className="font-paragraph text-base text-secondary/80 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    Wipe all personal data from devices before recycling
                  </li>
                  <li className="font-paragraph text-base text-secondary/80 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    Handle broken screens and damaged devices with care
                  </li>
                  <li className="font-paragraph text-base text-secondary/80 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    Never dispose of e-waste in regular trash bins
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guidelines Categories */}
      <section id="disposal" className="w-full bg-background py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-4">
              Disposal Categories
            </h2>
            <p className="font-paragraph text-lg text-secondary/80 max-w-2xl mx-auto">
              Browse detailed guidelines for different types of electronic waste
            </p>
          </motion.div>

          <div className="min-h-[400px]">
            {isLoading ? null : filteredGuidelines.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredGuidelines.map((guideline, index) => (
                    <AccordionItem
                      key={guideline._id}
                      value={guideline._id}
                      className="bg-backgrounddark rounded-lg border-none overflow-hidden"
                    >
                      <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-backgrounddark/80">
                        <div className="flex items-center gap-4 text-left w-full">
                          {guideline.identificationImage && (
                            <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-background">
                              <Image
                                src={guideline.identificationImage}
                                alt={guideline.categoryName || 'Category image'}
                                className="w-full h-full object-cover"
                                width={64}
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-heading text-xl text-secondary-foreground mb-1">
                              {guideline.categoryName || 'Unnamed Category'}
                            </h3>
                            {guideline.categoryDescription && (
                              <p className="font-paragraph text-sm text-secondary-foreground/70 line-clamp-1">
                                {guideline.categoryDescription}
                              </p>
                            )}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-8 pb-6">
                        <div className="space-y-6 pt-4">
                          {/* Category Description */}
                          {guideline.categoryDescription && (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <Info className="w-5 h-5 text-primary" />
                                <h4 className="font-heading text-lg text-secondary-foreground">
                                  Description
                                </h4>
                              </div>
                              <p className="font-paragraph text-base text-secondary-foreground/80 leading-relaxed">
                                {guideline.categoryDescription}
                              </p>
                            </div>
                          )}

                          {/* Identification Tips */}
                          {guideline.identificationTips && (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle className="w-5 h-5 text-primary" />
                                <h4 className="font-heading text-lg text-secondary-foreground">
                                  Identification Tips
                                </h4>
                              </div>
                              <p className="font-paragraph text-base text-secondary-foreground/80 leading-relaxed">
                                {guideline.identificationTips}
                              </p>
                            </div>
                          )}

                          {/* Disposal Instructions */}
                          {guideline.disposalInstructions && (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <BookOpen className="w-5 h-5 text-primary" />
                                <h4 className="font-heading text-lg text-secondary-foreground">
                                  Disposal Instructions
                                </h4>
                              </div>
                              <p className="font-paragraph text-base text-secondary-foreground/80 leading-relaxed">
                                {guideline.disposalInstructions}
                              </p>
                            </div>
                          )}

                          {/* Safety Warnings */}
                          {guideline.safetyWarnings && (
                            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-5 h-5 text-destructive" />
                                <h4 className="font-heading text-lg text-secondary-foreground">
                                  Safety Warnings
                                </h4>
                              </div>
                              <p className="font-paragraph text-base text-secondary-foreground/80 leading-relaxed">
                                {guideline.safetyWarnings}
                              </p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-secondary/20 mx-auto mb-4" />
                <h3 className="font-heading text-2xl text-secondary mb-2">
                  No Guidelines Found
                </h3>
                <p className="font-paragraph text-base text-secondary/60">
                  Try adjusting your search query
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="w-full bg-primary py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-8">
              Quick Recycling Tips
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Prepare Your Devices',
                  description: 'Back up data, perform factory reset, and remove SIM cards and memory cards'
                },
                {
                  title: 'Check Acceptance',
                  description: 'Verify that your items are accepted at your chosen recycling location'
                },
                {
                  title: 'Transport Safely',
                  description: 'Pack fragile items carefully and transport them securely to prevent damage'
                }
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-heading text-2xl text-primary-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl text-primary-foreground mb-3">
                    {tip.title}
                  </h3>
                  <p className="font-paragraph text-base text-primary-foreground/90">
                    {tip.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
