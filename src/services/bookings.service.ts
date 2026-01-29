import { api } from "@/lib/api";
import { Booking, BookingStatus } from "@/types";

interface CreateBooking {
  tutorId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export const bookingsService = {
  getBookings: () => api.get<{ bookings: Booking[] }>("/bookings"),

  getBookingById: (id: string) => api.get<Booking>(`/bookings/${id}`),

  createBooking: (data: CreateBooking) => api.post<Booking>("/bookings", data),

  updateBookingStatus: (id: string, status: BookingStatus) =>
    api.patch<Booking>(`/bookings/${id}/status`, { status }),
};
