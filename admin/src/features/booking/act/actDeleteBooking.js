import {createAsyncThunk} from '@reduxjs/toolkit'


 const deleteBooking = createAsyncThunk(
    "deleteBooking/booking",
    async (id, thunkApi) => {
      try {
        const res = await fetch(`/api/bookings/${id}`, {
          headers: {
            "Content-type": "application/json",
          },
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          return thunkApi.rejectWithValue(data);
        }
  
        return data;
      } catch (error) {
        console.log(error.message);
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );

  export default deleteBooking;