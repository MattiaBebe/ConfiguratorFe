import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "route",
  initialState: {
      config: null,
      currentRuote: '/',
      testCounter: 3
  },
  reducers: {
    setConfig(state, action) {
      state.config = action.payload;
    },
    setCounter(state, action){
      state.testCounter = action.payload;
    }
  }
});

// Export actions
export const { 
  setConfig,
  setCounter
} = routeSlice.actions;

// Export reducer
export default routeSlice.reducer;
