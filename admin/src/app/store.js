import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice.js'
import room  from '../features/room/roomSlice.js';

export const store = configureStore({
  reducer: {
    auth,
    room
    
  },
});
