import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "route",
  initialState: {
      config: null,
      currentRuote: 'http://localhost:3000/configuration',
      testCounter: 3,
      breadcrumb: '/HOME'
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
    },
    setBreadcrumb(state, action){
      state.breadcrumb = action.payload;
    }
  }
});

// Export actions
export const { 
  setConfig,
  setCounter,
  setCurrentRoute,
  setBreadcrumb
} = routeSlice.actions;

// Export reducer
export default routeSlice.reducer;
