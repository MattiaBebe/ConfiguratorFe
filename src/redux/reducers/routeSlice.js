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
    setCurrentRoute(state, action){
      state.currentRuote = action.payload;
    },
    setCounter(state, action){
      state.testCounter = action.payload;
    }
  }
});

// Export actions
export const { 
  setConfig,
  setCounter,
  setCurrentRoute
} = routeSlice.actions;

// Export reducer
export default routeSlice.reducer;
