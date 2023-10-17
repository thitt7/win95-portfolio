import { configureStore } from '@reduxjs/toolkit';
import programReducer from './reducers/programSlice';

export default configureStore({
  reducer: {
    program: programReducer
  },
})