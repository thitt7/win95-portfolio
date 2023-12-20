import { configureStore } from '@reduxjs/toolkit';
import programReducer from './reducers/programSlice';
import menuReducer from './reducers/menuSlice';
import desktopReducer from './reducers/desktopSlice';
import recycleReducer from './reducers/recycleSlice';

export default configureStore({
  reducer: {
    program: programReducer,
    menu: menuReducer,
    desktop: desktopReducer,
    recycle: recycleReducer
  },
})