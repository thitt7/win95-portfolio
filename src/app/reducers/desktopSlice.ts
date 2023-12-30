import { createSlice } from '@reduxjs/toolkit';
import programs from '../../../public/programs.json';

const initialState = {items: [
    programs['neighborhood'],
    // programs['recycle'],
    programs['drive'],
    programs['iexplorer'],
    programs['resume'],
    programs['github'],
    programs['linkedin'],
    programs['codepen'],
]};

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
    remove: (state: any, action: any) => {
        // const copy = JSON.parse(JSON.stringify(state.items))
        // copy.map((e: any) => {
        //   console.log('obj: ', JSON.stringify(e))
        //   console.log('PAYLOAD: ', JSON.stringify(action.payload))
        //   console.log('EQUALS: ', JSON.stringify(e) == JSON.stringify(action.payload))
        // })
        const i = state.items.findIndex((obj: any) => JSON.stringify(obj) == JSON.stringify(action.payload));
        // const j = copy.indexOf(action.payload)
        console.log('i in remove fn: ', i)
        state.items.splice(i, 1)
        // delete state.items[i];
    }
  },
})

export const { set, add, remove } = desktopSlice.actions;

export default desktopSlice.reducer;