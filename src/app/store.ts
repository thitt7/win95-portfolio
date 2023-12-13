import { configureStore } from '@reduxjs/toolkit';
import programReducer from './reducers/programSlice';
import menuReducer from './reducers/menuSlice';
import desktopReducer from './reducers/desktopSlice';

export default configureStore({
  reducer: {
    program: programReducer,
    menu: menuReducer,
    desktop: desktopReducer
  },
})