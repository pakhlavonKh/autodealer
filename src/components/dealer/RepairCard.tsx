import { CarInRepair } from '@/types/dealer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Car, Clock, User, Phone, AlertCircle, CheckCircle2, Pause, Play } from 'lucide-react';

interface RepairCardProps {
  repair: CarInRepair;
  onUpdateStatus: (id: number, status: CarInRepair['status']) => void;
}

export const RepairCard = ({ repair, onUpdateStatus }: RepairCardProps) => {
  const getStatusColor = (status: CarInRepair['status']) => {
    switch (status) {
      case 'IN_PROGRESS': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'WAITING_PARTS': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'READY': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'COMPLETED': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: CarInRepair['priority']) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'LOW': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: CarInRepair['status']) => {
    switch (status) {
      case 'IN_PROGRESS': return <Play className="h-4 w-4" />;
      case 'WAITING_PARTS': return <Pause className="h-4 w-4" />;
      case 'READY': return <CheckCircle2 className="h-4 w-4" />;
      case 'COMPLETED': return <CheckCircle2 className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="hover:shadow-elegant transition-all duration-300 bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-foreground flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              {repair.carModel} ({repair.carYear})
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              License: <span className="font-mono">{repair.licensePlate}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className={getPriorityColor(repair.priority)}>
              {repair.priority}
            </Badge>
            <Badge className={getStatusColor(repair.status)}>
              {getStatusIcon(repair.status)}
              {repair.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{repair.customerName}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{repair.customerPhone}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-muted-foreground">
              Service: <span className="text-foreground">{repair.serviceType}</span>
            </div>
            <div className="text-muted-foreground">
              Mechanic: <span className="text-foreground">{repair.mechanicAssigned}</span>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Clock className="h-4 w-4" />
            <span>Est. Completion: {new Date(repair.estimatedCompletion).toLocaleDateString()} at {new Date(repair.estimatedCompletion).toLocaleTimeString()}</span>
          </div>
          {repair.notes && (
            <p className="text-sm text-foreground mt-2">{repair.notes}</p>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {repair.status === 'IN_PROGRESS' && (
            <>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onUpdateStatus(repair.id, 'WAITING_PARTS')}
                className="flex-1"
              >
                <Pause className="h-4 w-4 mr-1" />
                Wait for Parts
              </Button>
              <Button 
                size="sm"
                onClick={() => onUpdateStatus(repair.id, 'READY')}
                className="flex-1 bg-gradient-secondary hover:bg-gradient-primary"
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Mark Ready
              </Button>
            </>
          )}
          {repair.status === 'WAITING_PARTS' && (
            <Button 
              size="sm"
              onClick={() => onUpdateStatus(repair.id, 'IN_PROGRESS')}
              className="flex-1 bg-gradient-primary hover:bg-gradient-secondary"
            >
              <Play className="h-4 w-4 mr-1" />
              Resume Work
            </Button>
          )}
          {repair.status === 'READY' && (
            <Button 
              size="sm"
              onClick={() => onUpdateStatus(repair.id, 'COMPLETED')}
              className="flex-1 bg-gradient-secondary hover:bg-gradient-primary"
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};