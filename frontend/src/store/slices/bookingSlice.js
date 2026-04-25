import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMovie: null,
  selectedSeats: [],
  currentBookingId: null,
  // Status: IDLE, PENDING, PAYMENT_COMPLETED, BOOKING_FAILED
  status: 'IDLE',
  error: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
      state.selectedSeats = [];
      state.status = 'IDLE';
    },
    toggleSeat: (state, action) => {
      const seatId = action.payload;
      if (state.selectedSeats.includes(seatId)) {
        state.selectedSeats = state.selectedSeats.filter(id => id !== seatId);
      } else {
        state.selectedSeats.push(seatId);
      }
    },
    clearSeats: (state) => {
      state.selectedSeats = [];
    },
    initiateBooking: (state) => {
      state.status = 'PENDING';
      state.error = null;
    },
    bookingCreated: (state, action) => {
      state.currentBookingId = action.payload;
    },
    paymentSuccess: (state) => {
      state.status = 'PAYMENT_COMPLETED';
    },
    bookingFailed: (state, action) => {
      state.status = 'BOOKING_FAILED';
      state.error = action.payload;
    },
    resetBookingState: (state) => {
      state.selectedSeats = [];
      state.currentBookingId = null;
      state.status = 'IDLE';
      state.error = null;
    }
  },
});

export const { 
  selectMovie, 
  toggleSeat, 
  clearSeats,
  initiateBooking, 
  bookingCreated,
  paymentSuccess, 
  bookingFailed,
  resetBookingState
} = bookingSlice.actions;

export default bookingSlice.reducer;
