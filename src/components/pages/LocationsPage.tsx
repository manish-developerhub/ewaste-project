import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { RecyclingLocations } from '@/entities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LocationsPage() {
  const [locations, setLocations] = useState<RecyclingLocations[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<RecyclingLocations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailable, setFilterAvailable] = useState<'all' | 'available' | 'unavailable'>('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const LIMIT = 50;

  useEffect(() => {
    loadLocations();
  }, [skip]);

  useEffect(() => {
    filterLocations();
  }, [locations, searchQuery, filterAvailable]);

  const loadLocations = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<RecyclingLocations>('recyclinglocations', {}, { limit: LIMIT, skip });
      setLocations(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Failed to load locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterLocations = () => {
    let filtered = [...locations];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(loc => 
        loc.locationName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.acceptedWasteTypes?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Availability filter
    if (filterAvailable === 'available') {
      filtered = filtered.filter(loc => loc.isAvailable === true);
    } else if (filterAvailable === 'unavailable') {
      filtered = filtered.filter(loc => loc.isAvailable === false);
    }

    setFilteredLocations(filtered);
  };

  const loadMore = () => {
    setSkip(skip + LIMIT);
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
            <h1 className="font-heading text-5xl md:text-6xl text-primary-foreground mb-6">
              Find E-Waste Bins Near You
            </h1>
            <p className="font-paragraph text-lg text-primary-foreground/90">
              Locate convenient recycling locations and check real-time availability
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full bg-background py-8 border-b border-secondary/10">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/40" />
              <Input
                type="text"
                placeholder="Search by location, address, or waste type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 font-paragraph"
              />
            </div>

            {/* Availability Filter */}
            <div className="flex gap-2">
              <Button
                variant={filterAvailable === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterAvailable('all')}
                className="h-12 font-paragraph"
              >
                <Filter className="w-4 h-4 mr-2" />
                All
              </Button>
              <Button
                variant={filterAvailable === 'available' ? 'default' : 'outline'}
                onClick={() => setFilterAvailable('available')}
                className="h-12 font-paragraph"
              >
                Available
              </Button>
              <Button
                variant={filterAvailable === 'unavailable' ? 'default' : 'outline'}
                onClick={() => setFilterAvailable('unavailable')}
                className="h-12 font-paragraph"
              >
                Unavailable
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="w-full bg-background py-16">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="min-h-[400px]">
            {isLoading ? null : filteredLocations.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {filteredLocations.map((location, index) => (
                    <motion.div
                      key={location._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link to={`/locations/${location._id}`}>
                        <div className="bg-backgrounddark p-6 rounded-lg hover:shadow-lg transition-shadow h-full flex flex-col">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="font-heading text-xl text-secondary-foreground">
                              {location.locationName || 'Unnamed Location'}
                            </h3>
                            {location.isAvailable ? (
                              <Badge className="bg-primary text-primary-foreground">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Available
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-destructive text-destructive">
                                <XCircle className="w-3 h-3 mr-1" />
                                Unavailable
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-start gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <p className="font-paragraph text-sm text-secondary-foreground/80">
                              {location.address || 'Address not available'}
                            </p>
                          </div>

                          {location.operatingHours && (
                            <div className="flex items-start gap-2 mb-4">
                              <Clock className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                              <p className="font-paragraph text-sm text-secondary-foreground/80">
                                {location.operatingHours}
                              </p>
                            </div>
                          )}

                          {location.acceptedWasteTypes && (
                            <div className="mt-auto pt-4 border-t border-secondary-foreground/10">
                              <p className="font-paragraph text-xs text-secondary-foreground/60 mb-2">
                                Accepted Items:
                              </p>
                              <p className="font-paragraph text-sm text-secondary-foreground/80 line-clamp-2">
                                {location.acceptedWasteTypes}
                              </p>
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {hasNext && (
                  <div className="text-center">
                    <Button
                      onClick={loadMore}
                      className="bg-primary text-primary-foreground hover:bg-accentbluelight h-12 px-8 font-paragraph"
                    >
                      Load More Locations
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <MapPin className="w-16 h-16 text-secondary/20 mx-auto mb-4" />
                <h3 className="font-heading text-2xl text-secondary mb-2">
                  No Locations Found
                </h3>
                <p className="font-paragraph text-base text-secondary/60">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
