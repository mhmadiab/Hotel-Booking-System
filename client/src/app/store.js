import { configureStore } from '@reduxjs/toolkit';
import room from '../features/room/roomSlice'
import booking from '../features/booking/bookingSlice'

export const store = configureStore({
  reducer: {
    room,
    booking
  },
});
