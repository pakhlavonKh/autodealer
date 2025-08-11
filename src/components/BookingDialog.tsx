import { useState } from 'react';
import { ServiceCenter, CreateBookingRequest } from '@/types/autoServices';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, MapPin, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingDialogProps {
  center: ServiceCenter | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookingDialog = ({ center, open, onOpenChange }: BookingDialogProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!center || !date || !time) return;

    setIsSubmitting(true);

    // Simulate API call
    const bookingRequest: CreateBookingRequest = {
      userId: 1, // MVP: hardcoded user
      centerId: center.id,
      notes,
      scheduledAt: `${date}T${time}:00`
    };

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Booking Confirmed!",
        description: `Your appointment at ${center.title} is scheduled for ${date} at ${time}`,
      });

      // Reset form
      setDate('');
      setTime('');
      setNotes('');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!center) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-card border-border/50">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-foreground">Book Service Appointment</DialogTitle>
          <div className="bg-muted/30 p-4 rounded-lg space-y-2">
            <h3 className="font-medium text-foreground">{center.title}</h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              <span>{center.address}, {center.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="text-sm text-secondary font-medium">{center.rating}</span>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10 bg-background/50"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time" className="text-foreground">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10 bg-background/50"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground">Service Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Describe the issue or service needed..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px] bg-background/50"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-secondary hover:bg-gradient-primary text-secondary-foreground hover:shadow-glow transition-all duration-300"
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};