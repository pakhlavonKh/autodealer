export interface CarInRepair {
  id: number;
  customerName: string;
  customerPhone: string;
  carModel: string;
  carYear: number;
  licensePlate: string;
  serviceType: string;
  status: 'IN_PROGRESS' | 'WAITING_PARTS' | 'READY' | 'COMPLETED';
  estimatedCompletion: string;
  actualStartTime: string;
  notes: string;
  mechanicAssigned: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface Appointment {
  id: number;
  customerName: string;
  customerPhone: string;
  carModel: string;
  serviceType: string;
  scheduledTime: string;
  duration: number; // in minutes
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  mechanicAssigned?: string;
  notes?: string;
}

export interface Mechanic {
  id: number;
  name: string;
  specialization: string[];
  currentLoad: number; // number of active jobs
  maxCapacity: number;
  availability: 'AVAILABLE' | 'BUSY' | 'OFF_DUTY';
}