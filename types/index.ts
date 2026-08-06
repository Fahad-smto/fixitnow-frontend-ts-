// These types mirror the shapes returned by the backend API.
// Keeping them in one place makes it easy to see what data looks like everywhere.

export type Role = 'customer' | 'technician' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export interface TechnicianProfile {
  id: string;
  userId: string;
  skills: string[];
  experience: number | null;
  pricing: number | null;
  bio: string | null;
  rating: number;
  user?: { id: string; name: string; email: string };
}

export interface Service {
  id: string;
  technicianId: string;
  categoryId: string;
  title: string;
  description: string | null;
  price: number;
  location: string | null;
  category?: Category;
  technician?: TechnicianProfile;
}

export type BookingStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  timeSlot: string;
  address: string | null;
  notes: string | null;
  amount: number;
  status: BookingStatus;
  service?: Service;
  technician?: TechnicianProfile;
  customer?: { id: string; name: string };
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  paidAt: string | null;
  booking?: Booking;
}

export interface Review {
  id: string;
  bookingId: string;
  rating: number;
  comment: string | null;
}
