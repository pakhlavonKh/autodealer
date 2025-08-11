import { Mechanic } from '@/types/dealer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Wrench, Activity } from 'lucide-react';

interface MechanicCardProps {
  mechanic: Mechanic;
}

export const MechanicCard = ({ mechanic }: MechanicCardProps) => {
  const getAvailabilityColor = (availability: Mechanic['availability']) => {
    switch (availability) {
      case 'AVAILABLE': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'BUSY': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'OFF_DUTY': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const workloadPercentage = (mechanic.currentLoad / mechanic.maxCapacity) * 100;

  return (
    <Card className="hover:shadow-elegant transition-all duration-300 bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {mechanic.name}
            </CardTitle>
          </div>
          <Badge className={getAvailabilityColor(mechanic.availability)}>
            {mechanic.availability.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Activity className="h-4 w-4" />
              <span>Workload: {mechanic.currentLoad} / {mechanic.maxCapacity} jobs</span>
            </div>
            <Progress 
              value={workloadPercentage} 
              className="h-2"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Wrench className="h-4 w-4" />
              <span>Specializations:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {mechanic.specialization.map((spec) => (
                <Badge 
                  key={spec} 
                  variant="secondary" 
                  className="text-xs bg-muted/50"
                >
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};