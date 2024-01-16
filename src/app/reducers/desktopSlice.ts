import { createSlice } from '@reduxjs/toolkit';
import programs from '@components/Programs/Programs';

const initialState = {
  items: [
    programs['neighborhood'],
    // programs['recycle'],
    programs['drive'],
    programs['iexplorer'],
    programs['resume'],
    programs['github'],
    programs['linkedin'],
    programs['codepen'],
    programs['doom'],
  ],
  selected: []
};

export const desktopSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    set: (state: any, action: any) => {
        state.items = [...state.items, ...action.payload]
    },
    add: (state: any, action: {payload: {} | []}) => {
      if (Array.isArray(action.payload)) {
        state.items = [...state.items, ...action.payload]
      }
      else {state.items.push(action.payload)}
    },
    remove: (state: any, action: {payload: {} | number[]}) => {
        
      if (Array.isArray(action.payload)) {
        for (let i = action.payload.length - 1; i >= 0; i--) {
          state.items.splice(action.payload[i], 1);
        }
      }
      else {
        const i = state.items.findIndex((obj: any) => JSON.stringify(obj) == JSON.stringify(action.payload));
        state.items.splice(i, 1)
      }
    },
    setSelected: (state: any, action: {payload: boolean[]}) => {
      state.selected = action.payload;
    }
  },
})

export const { set, add, remove, setSelected } = desktopSlice.actions;

export default desktopSlice.reducer;