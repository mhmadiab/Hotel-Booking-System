import {createAsyncThunk} from '@reduxjs/toolkit'

const confirmBooking = createAsyncThunk("confirm/booking", async (bookingId, thunkApi) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ confirmed: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  })

export default confirmBooking;