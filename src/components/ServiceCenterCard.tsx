import { ServiceCenter } from '@/types/autoServices';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Wrench } from 'lucide-react';

interface ServiceCenterCardProps {
  center: ServiceCenter;
  onBookNow: (center: ServiceCenter) => void;
}

export const ServiceCenterCard = ({ center, onBookNow }: ServiceCenterCardProps) => {
  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 bg-gradient-card border-border/50 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-foreground group-hover:text-primary transition-colors">
              {center.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{center.address}, {center.city}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span className="text-sm font-medium text-secondary">{center.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {center.services?.slice(0, 3).map((service) => (
            <Badge key={service} variant="secondary" className="text-xs bg-muted/50">
              <Wrench className="h-3 w-3 mr-1" />
              {service}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-muted-foreground text-sm">
            Price range: <span className="text-foreground font-medium">{center.priceRange}</span>
          </span>
          <Button 
            onClick={() => onBookNow(center)}
            className="bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground hover:shadow-glow transition-all duration-300"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};