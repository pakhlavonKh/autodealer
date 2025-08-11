export interface ServiceCenter {
  id: number;
  title: string;
  city: string;
  address: string;
  geoLat: number;
  geoLon: number;
  rating: number;
  image?: string;
  services?: string[];
  priceRange?: string;
}

export interface Booking {
  id: number;
  userId: number;
  centerId: number;
  notes: string;
  scheduledAt: string;
  status: 'NEW' | 'CONFIRMED' | 'CANCELED';
}

export interface CreateBookingRequest {
  userId: number;
  centerId: number;
  notes?: string;
  scheduledAt: string;
}