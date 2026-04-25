import { bookingClient } from './apiClient';

export const bookingService = {
  createBooking: async (bookingData) => {
    // API: POST /bookings
    // Booking structure: { userId, movieId, seatNumber }
    const response = await bookingClient.post('/bookings', bookingData);
    
    // Extract ID from the string response "Booking created with ID: 1. Waiting for payment..."
    const bookingId = response.match(/\d+/)[0];
    return { bookingId, status: 'PENDING' };
  },

  pollBookingStatus: async (bookingId) => {
    // We check the status by fetching all bookings and finding ours
    // In a real app, we would have GET /bookings/{id}
    const allBookings = await bookingClient.get('/bookings');
    const myBooking = allBookings.find(b => b.id.toString() === bookingId.toString());
    
    if (!myBooking) return { status: 'PENDING' };
    
    if (myBooking.status === 'SUCCESS') {
      return { status: 'PAYMENT_COMPLETED' };
    } else if (myBooking.status === 'FAILED') {
      return { status: 'BOOKING_FAILED', error: 'Payment failed' };
    }
    
    return { status: 'PENDING' };
  }
};
