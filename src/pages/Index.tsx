import { useState, useMemo } from 'react';
import { ServiceCenter } from '@/types/autoServices';
import { mockServiceCenters } from '@/data/mockData';
import { ServiceCenterCard } from '@/components/ServiceCenterCard';
import { BookingDialog } from '@/components/BookingDialog';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Car, Wrench, Star, Users } from 'lucide-react';
import heroImage from '@/assets/hero-auto-service.jpg';

const Index = () => {
  const [selectedCenter, setSelectedCenter] = useState<ServiceCenter | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchCity, setSearchCity] = useState('');

  const filteredCenters = useMemo(() => {
    if (!searchCity) return mockServiceCenters;
    return mockServiceCenters.filter(center => 
      center.city.toLowerCase().includes(searchCity.toLowerCase())
    );
  }, [searchCity]);

  const handleBookNow = (center: ServiceCenter) => {
    setSelectedCenter(center);
    setIsBookingOpen(true);
  };

  const handleSearch = (city: string) => {
    setSearchCity(city);
  };

  const stats = [
    { label: 'Service Centers', value: '50+', icon: Wrench },
    { label: 'Happy Customers', value: '10k+', icon: Users },
    { label: 'Average Rating', value: '4.8', icon: Star },
    { label: 'Cities Covered', value: '25+', icon: Car },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            AutoServices
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find trusted auto service centers in your city. Book appointments instantly and get your car serviced by professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <SearchBar onSearch={handleSearch} placeholder="Enter your city..." />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-card p-6 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Centers Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {searchCity ? `Service Centers in ${searchCity}` : 'Featured Service Centers'}
            </h2>
            <p className="text-muted-foreground">
              {filteredCenters.length} centers available
            </p>
          </div>
        </div>

        {filteredCenters.length === 0 ? (
          <div className="text-center py-16">
            <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No service centers found</h3>
            <p className="text-muted-foreground mb-6">Try searching for a different city</p>
            <Button 
              onClick={() => setSearchCity('')}
              className="bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground"
            >
              Show All Centers
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((center) => (
              <ServiceCenterCard
                key={center.id}
                center={center}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        )}
      </section>

      {/* Booking Dialog */}
      <BookingDialog
        center={selectedCenter}
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
      />
    </div>
  );
};

export default Index;
