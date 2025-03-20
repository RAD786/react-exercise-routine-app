import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const EXERCISE_API_URL = "https://api.api-ninjas.com/v1/exercises";
const API_KEY = "YOUR_API_KEY_HERE";

// 🔹 Async thunk for fetching exercises
export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(`${EXERCISE_API_URL}?name=${query}`, {
        headers: { "X-Api-Key": API_KEY },
      });
      if (!response.ok) throw new Error("Failed to fetch exercises");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Slice for exercises state
const exercisesSlice = createSlice({
  name: "exercises",
  initialState: {
    exercises: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default exercisesSlice.reducer;
