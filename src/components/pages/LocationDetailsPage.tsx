import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, CheckCircle, XCircle, ArrowLeft, Navigation } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { RecyclingLocations } from '@/entities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LocationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<RecyclingLocations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLocation();
  }, [id]);

  const loadLocation = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<RecyclingLocations>('recyclinglocations', id);
      setLocation(data);
    } catch (error) {
      console.error('Failed to load location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openInMaps = () => {
    if (location?.latitude && location?.longitude) {
      window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, '_blank');
    } else if (location?.address) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="w-full bg-background py-8">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <Link to="/locations">
            <Button variant="outline" className="font-paragraph">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Locations
            </Button>
          </Link>
        </div>
      </div>

      <section className="w-full bg-background pb-20">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : !location ? (
              <div className="text-center py-20">
                <MapPin className="w-16 h-16 text-secondary/20 mx-auto mb-4" />
                <h2 className="font-heading text-3xl text-secondary mb-2">
                  Location Not Found
                </h2>
                <p className="font-paragraph text-base text-secondary/60 mb-6">
                  The location you're looking for doesn't exist
                </p>
                <Link to="/locations">
                  <Button className="bg-primary text-primary-foreground hover:bg-accentbluelight font-paragraph">
                    View All Locations
                  </Button>
                </Link>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left Column - Main Info */}
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <h1 className="font-heading text-4xl md:text-5xl text-secondary">
                        {location.locationName || 'Unnamed Location'}
                      </h1>
                      {location.isAvailable ? (
                        <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-destructive text-destructive text-base px-4 py-2">
                          <XCircle className="w-4 h-4 mr-2" />
                          Unavailable
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-6 mb-8">
                      {/* Address */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg text-secondary mb-1">
                            Address
                          </h3>
                          <p className="font-paragraph text-base text-secondary/80">
                            {location.address || 'Address not available'}
                          </p>
                        </div>
                      </div>

                      {/* Operating Hours */}
                      {location.operatingHours && (
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-heading text-lg text-secondary mb-1">
                              Operating Hours
                            </h3>
                            <p className="font-paragraph text-base text-secondary/80">
                              {location.operatingHours}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Coordinates */}
                      {location.latitude && location.longitude && (
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Navigation className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-heading text-lg text-secondary mb-1">
                              Coordinates
                            </h3>
                            <p className="font-paragraph text-base text-secondary/80">
                              {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={openInMaps}
                      className="bg-primary text-primary-foreground hover:bg-accentbluelight h-12 px-8 font-paragraph"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>

                  {/* Right Column - Details */}
                  <div className="bg-backgrounddark p-8 rounded-lg">
                    <h2 className="font-heading text-2xl text-secondary-foreground mb-6">
                      Accepted E-Waste Types
                    </h2>
                    
                    {location.acceptedWasteTypes ? (
                      <div className="space-y-4">
                        <p className="font-paragraph text-base text-secondary-foreground/90 leading-relaxed">
                          {location.acceptedWasteTypes}
                        </p>
                        
                        <div className="pt-6 border-t border-secondary-foreground/10">
                          <h3 className="font-heading text-lg text-secondary-foreground mb-3">
                            Before You Visit
                          </h3>
                          <ul className="space-y-2">
                            <li className="font-paragraph text-sm text-secondary-foreground/80 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              Check if your items are accepted at this location
                            </li>
                            <li className="font-paragraph text-sm text-secondary-foreground/80 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              Remove batteries and personal data from devices
                            </li>
                            <li className="font-paragraph text-sm text-secondary-foreground/80 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              Visit during operating hours for best service
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="font-paragraph text-base text-secondary-foreground/60">
                        Information about accepted waste types is not available for this location.
                      </p>
                    )}

                    <div className="mt-8 pt-6 border-t border-secondary-foreground/10">
                      <Link to="/guidelines">
                        <Button variant="outline" className="w-full border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-backgrounddark h-12 font-paragraph">
                          View Disposal Guidelines
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
