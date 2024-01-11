import { createSlice } from '@reduxjs/toolkit';

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
    remove: (state, action: {payload: number[]}) => {
        // const i = state.binItems.findIndex((obj: any) => JSON.stringify(obj) == JSON.stringify(action.payload));
        console.log('in remove action!!!')
        // state.binItems.splice(action.payload, 1)
        if (Array.isArray(action.payload)) {
          for (let i = action.payload.length - 1; i >= 0; i--) {
            state.binItems.splice(action.payload[i], 1);
          }
        }
        else {state.binItems.splice(action.payload, 1)}
    }, 
    empty: (state) => { state.binItems = [] }
  },
})

export const { set, add, remove, empty } = recycleSlice.actions;

export default recycleSlice.reducer;