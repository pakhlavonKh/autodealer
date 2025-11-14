import { CarInRepair, Appointment, Mechanic } from '@/types/dealer';

export const mockCarsInRepair: CarInRepair[] = [
  {
    id: 1,
    customerName: "John Smith",
    customerPhone: "+998 90 123 4567",
    carModel: "Toyota Camry",
    carYear: 2019,
    licensePlate: "01A234BC",
    serviceType: "Engine Repair",
    status: "IN_PROGRESS",
    estimatedCompletion: "2024-08-12T16:00:00",
    actualStartTime: "2024-08-11T09:00:00",
    notes: "Engine making unusual noise, needs diagnostic check",
    mechanicAssigned: "Akmal Karimov",
    priority: "HIGH"
  },
  {
    id: 2,
    customerName: "Sarah Johnson", 
    customerPhone: "+998 91 234 5678",
    carModel: "BMW X5",
    carYear: 2021,
    licensePlate: "01B567DE",
    serviceType: "Brake Service",
    status: "WAITING_PARTS",
    estimatedCompletion: "2024-08-13T14:00:00",
    actualStartTime: "2024-08-11T11:30:00",
    notes: "Brake pads need replacement, waiting for OEM parts",
    mechanicAssigned: "Dilshod Umarov",
    priority: "MEDIUM"
  },
  {
    id: 3,
    customerName: "Mike Davis",
    customerPhone: "+998 93 345 6789", 
    carModel: "Honda Civic",
    carYear: 2020,
    licensePlate: "01C890FG",
    serviceType: "Oil Change",
    status: "READY",
    estimatedCompletion: "2024-08-11T15:00:00",
    actualStartTime: "2024-08-11T13:00:00",
    notes: "Standard oil change service completed",
    mechanicAssigned: "Bobur Toshev",
    priority: "LOW"
  },
  {
    id: 4,
    customerName: "Emily Wilson",
    customerPhone: "+998 94 456 7890",
    carModel: "Mercedes C-Class", 
    carYear: 2022,
    licensePlate: "01D123HI",
    serviceType: "AC Repair",
    status: "IN_PROGRESS",
    estimatedCompletion: "2024-08-12T12:00:00",
    actualStartTime: "2024-08-11T14:00:00",
    notes: "AC not cooling properly, checking refrigerant levels",
    mechanicAssigned: "Sardor Rahimov",
    priority: "MEDIUM"
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 1,
    customerName: "David Brown",
    customerPhone: "+998 95 567 8901",
    carModel: "Ford Focus",
    serviceType: "Diagnostics",
    scheduledTime: "2024-08-12T09:00:00",
    duration: 60,
    status: "SCHEDULED",
    mechanicAssigned: "Dilshod Umarov",
    notes: "Customer reports engine warning light"
  },
  {
    id: 2,
    customerName: "Lisa Anderson", 
    customerPhone: "+998 96 678 9012",
    carModel: "Audi A4",
    serviceType: "Transmission Service",
    scheduledTime: "2024-08-12T11:00:00",
    duration: 180,
    status: "SCHEDULED",
    mechanicAssigned: "Akmal Karimov",
    notes: "Scheduled transmission fluid change"
  },
  {
    id: 3,
    customerName: "Robert Taylor",
    customerPhone: "+998 97 789 0123", 
    carModel: "Nissan Altima",
    serviceType: "Tire Replacement",
    scheduledTime: "2024-08-12T14:00:00",
    duration: 90,
    status: "SCHEDULED",
    mechanicAssigned: "Bobur Toshev",
    notes: "Replace all four tires"
  },
  {
    id: 4,
    customerName: "Jennifer Garcia",
    customerPhone: "+998 98 890 1234",
    carModel: "Volkswagen Jetta", 
    serviceType: "Battery Replacement",
    scheduledTime: "2024-08-12T16:00:00",
    duration: 45,
    status: "SCHEDULED",
    notes: "Battery not holding charge"
  }
];

export const mockMechanics: Mechanic[] = [
  {
    id: 1,
    name: "Akmal Karimov",
    specialization: ["Engine Repair", "Transmission", "Diagnostics"],
    currentLoad: 2,
    maxCapacity: 3,
    availability: "BUSY"
  },
  {
    id: 2,
    name: "Dilshod Umarov", 
    specialization: ["Brake Service", "Electrical", "Diagnostics"],
    currentLoad: 1,
    maxCapacity: 3,
    availability: "AVAILABLE"
  },
  {
    id: 3,
    name: "Bobur Toshev",
    specialization: ["Oil Change", "Tire Service", "General Maintenance"],
    currentLoad: 1,
    maxCapacity: 4,
    availability: "AVAILABLE"
  },
  {
    id: 4,
    name: "Sardor Rahimov",
    specialization: ["AC Repair", "Electrical", "Engine Repair"],
    currentLoad: 0,
    maxCapacity: 3,
    availability: "AVAILABLE"
  }
];