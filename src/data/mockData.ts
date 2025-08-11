import { ServiceCenter } from '@/types/autoServices';

export const mockServiceCenters: ServiceCenter[] = [
  {
    id: 1,
    title: "AutoPro Garage",
    city: "Tashkent",
    address: "Amir Temur 12",
    geoLat: 41.3111,
    geoLon: 69.2797,
    rating: 4.7,
    services: ["Engine Repair", "Oil Change", "Brake Service"],
    priceRange: "$$$"
  },
  {
    id: 2,
    title: "TurboFix Service",
    city: "Tashkent", 
    address: "Yunusabad 7",
    geoLat: 41.3630,
    geoLon: 69.2790,
    rating: 4.5,
    services: ["Transmission", "AC Repair", "Diagnostics"],
    priceRange: "$$"
  },
  {
    id: 3,
    title: "DriveCare",
    city: "Sergeli",
    address: "Sergeli-5, 22", 
    geoLat: 41.2300,
    geoLon: 69.2150,
    rating: 4.2,
    services: ["Tire Service", "Battery", "Oil Change"],
    priceRange: "$"
  },
  {
    id: 4,
    title: "Elite Motors",
    city: "Tashkent",
    address: "Shaykhantaur 45",
    geoLat: 41.3201,
    geoLon: 69.2685,
    rating: 4.9,
    services: ["Luxury Car Service", "Paint & Body", "Detailing"],
    priceRange: "$$$$"
  },
  {
    id: 5,
    title: "QuickFix Auto",
    city: "Samarkand",
    address: "Registan Street 89",
    geoLat: 39.6270,
    geoLon: 66.9750,
    rating: 4.3,
    services: ["Quick Service", "Oil Change", "Inspection"],
    priceRange: "$$"
  },
  {
    id: 6,
    title: "MegaService Center",
    city: "Samarkand", 
    address: "Amir Temur 156",
    geoLat: 39.6542,
    geoLon: 66.9597,
    rating: 4.6,
    services: ["Full Service", "Engine Overhaul", "Electrical"],
    priceRange: "$$$"
  }
];