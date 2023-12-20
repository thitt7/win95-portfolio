import { createSlice } from '@reduxjs/toolkit';
import programs from '../../../public/programs.json';

const initialState = {binItems: []};

export const recycleSlice = createSlice({
  name: 'binItems',
  initialState,
  reducers: {
    set: (state, action: any) => {
        state.binItems = [...state.binItems, ...action.payload]
      },
    add: (state, action: any) => {
        // const program = programs[`${action.payload as keyof typeof programs}`];
        state.binItems.push(action.payload);
    },
    remove: (state, action: any) => {
        const copy = JSON.parse(JSON.stringify(state.binItems))
        copy.map((e: any) => {
          console.log('obj: ', JSON.stringify(e))
          console.log('PAYLOAD: ', JSON.stringify(action.payload))
          console.log('EQUALS: ', JSON.stringify(e) == JSON.stringify(action.payload))
        })
        const i = state.binItems.findIndex((obj: any) => JSON.stringify(obj) == JSON.stringify(action.payload));
        console.log('i in remove fn: ', i)
        state.binItems.splice(i, 1)
    }
  },
})

export const { set, add, remove } = recycleSlice.actions;

export default recycleSlice.reducer;