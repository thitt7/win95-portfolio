import { configureStore } from '@reduxjs/toolkit';
import programReducer from './reducers/programSlice';
import menuReducer from './reducers/menuSlice';

export default configureStore({
  reducer: {
    program: programReducer,
    menu: menuReducer
  },
})