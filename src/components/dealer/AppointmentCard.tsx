import { Appointment } from '@/types/dealer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Phone, Car, Play, X } from 'lucide-react';

interface AppointmentCardProps {
  appointment: Appointment;
  onUpdateStatus: (id: number, status: Appointment['status']) => void;
}

export const AppointmentCard = ({ appointment, onUpdateStatus }: AppointmentCardProps) => {
  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'IN_PROGRESS': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'COMPLETED': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'CANCELLED': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const scheduledDate = new Date(appointment.scheduledTime);
  const endTime = new Date(scheduledDate.getTime() + appointment.duration * 60000);

  return (
    <Card className="hover:shadow-elegant transition-all duration-300 bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {scheduledDate.toLocaleDateString()}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{scheduledDate.toLocaleTimeString()} - {endTime.toLocaleTimeString()}</span>
              <span className="text-xs bg-muted/50 px-2 py-1 rounded">
                {appointment.duration} min
              </span>
            </div>
          </div>
          <Badge className={getStatusColor(appointment.status)}>
            {appointment.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{appointment.customerName}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{appointment.customerPhone}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Car className="h-4 w-4" />
              <span>{appointment.carModel}</span>
            </div>
            <div className="text-muted-foreground">
              Service: <span className="text-foreground">{appointment.serviceType}</span>
            </div>
          </div>
        </div>

        {appointment.mechanicAssigned && (
          <div className="bg-primary/10 p-2 rounded text-sm">
            <span className="text-muted-foreground">Assigned to: </span>
            <span className="text-primary font-medium">{appointment.mechanicAssigned}</span>
          </div>
        )}

        {appointment.notes && (
          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-sm text-foreground">{appointment.notes}</p>
          </div>
        )}

        {appointment.status === 'SCHEDULED' && (
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm"
              onClick={() => onUpdateStatus(appointment.id, 'IN_PROGRESS')}
              className="flex-1 bg-gradient-primary hover:bg-gradient-secondary"
            >
              <Play className="h-4 w-4 mr-1" />
              Start Service
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onUpdateStatus(appointment.id, 'CANCELLED')}
              className="hover:bg-destructive/20 hover:text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};