import { configureStore } from '@reduxjs/toolkit';  // Correct import for configureStore
import logger from 'redux-logger';  // Logger middleware

import rootReducer from './root-reducer';  // Import the root reducer

// Middleware array
const middlewares = [logger];

// Creating the Redux store using configureStore
const store = configureStore({
  reducer: rootReducer,  // rootReducer goes as `reducer` key
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),  // Add logger to the default middleware
  devTools: process.env.NODE_ENV !== 'production',  // Enable Redux DevTools only in development
});

export default store;
