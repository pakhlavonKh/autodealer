import { useState } from 'react';
import { CarInRepair, Appointment } from '@/types/dealer';
import { mockCarsInRepair, mockAppointments, mockMechanics } from '@/data/dealerMockData';
import { RepairCard } from '@/components/dealer/RepairCard';
import { AppointmentCard } from '@/components/dealer/AppointmentCard';
import { MechanicCard } from '@/components/dealer/MechanicCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Car, Calendar, Users, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DealerDashboard = () => {
  const [carsInRepair, setCarsInRepair] = useState(mockCarsInRepair);
  const [appointments, setAppointments] = useState(mockAppointments);
  const { toast } = useToast();

  const handleUpdateRepairStatus = (id: number, status: CarInRepair['status']) => {
    setCarsInRepair(prev => 
      prev.map(car => 
        car.id === id ? { ...car, status } : car
      )
    );
    
    const car = carsInRepair.find(c => c.id === id);
    toast({
      title: "Status Updated",
      description: `${car?.carModel} status changed to ${status.replace('_', ' ')}`,
    });
  };

  const handleUpdateAppointmentStatus = (id: number, status: Appointment['status']) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );
    
    const appointment = appointments.find(a => a.id === id);
    toast({
      title: "Appointment Updated",
      description: `${appointment?.customerName}'s appointment ${status.toLowerCase()}`,
    });
  };

  // Statistics
  const stats = [
    {
      title: 'Cars in Service',
      value: carsInRepair.filter(car => car.status !== 'COMPLETED').length,
      icon: Car,
      color: 'text-blue-400'
    },
    {
      title: 'Today\'s Appointments',
      value: appointments.filter(apt => apt.status === 'SCHEDULED').length,
      icon: Calendar,
      color: 'text-green-400'
    },
    {
      title: 'Urgent Repairs',
      value: carsInRepair.filter(car => car.priority === 'URGENT' || car.priority === 'HIGH').length,
      icon: AlertTriangle,
      color: 'text-red-400'
    },
    {
      title: 'Active Mechanics',
      value: mockMechanics.filter(mechanic => mechanic.availability !== 'OFF_DUTY').length,
      icon: Users,
      color: 'text-purple-400'
    }
  ];

  const statusCounts = {
    inProgress: carsInRepair.filter(car => car.status === 'IN_PROGRESS').length,
    waitingParts: carsInRepair.filter(car => car.status === 'WAITING_PARTS').length,
    ready: carsInRepair.filter(car => car.status === 'READY').length,
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Dealer Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Manage your service center operations and track all repairs
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="repairs" className="space-y-6">
          <TabsList className="bg-muted/30">
            <TabsTrigger value="repairs" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Cars in Repair
              <Badge variant="secondary" className="ml-2">
                {carsInRepair.filter(car => car.status !== 'COMPLETED').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointments
              <Badge variant="secondary" className="ml-2">
                {appointments.filter(apt => apt.status === 'SCHEDULED').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="mechanics" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team
              <Badge variant="secondary" className="ml-2">
                {mockMechanics.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="repairs" className="space-y-6">
            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    In Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">{statusCounts.inProgress}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    Waiting Parts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">{statusCounts.waitingParts}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Ready for Pickup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{statusCounts.ready}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {carsInRepair.filter(car => car.status !== 'COMPLETED').map((car) => (
                <RepairCard
                  key={car.id}
                  repair={car}
                  onUpdateStatus={handleUpdateRepairStatus}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {appointments.filter(apt => apt.status !== 'COMPLETED' && apt.status !== 'CANCELLED').map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onUpdateStatus={handleUpdateAppointmentStatus}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mechanics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMechanics.map((mechanic) => (
                <MechanicCard key={mechanic.id} mechanic={mechanic} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DealerDashboard;