import { api } from "@/lib/api";
import { Booking, BookingStatus } from "@/types";

interface CreateBooking {
  tutorId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export const bookingsService = {
  getBookings: () => api.get<{ bookings: Booking[] }>("/api/bookings"),

  getBookingById: (id: string) => api.get<Booking>(`/api/bookings/${id}`),

  createBooking: (data: CreateBooking) => api.post<Booking>("/api/bookings", data),

  updateBookingStatus: (id: string, status: BookingStatus) =>
    api.patch<Booking>(`/api/bookings/${id}/status`, { status }),
};
