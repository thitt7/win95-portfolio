import { createSlice } from '@reduxjs/toolkit';

// type Program = {
//     title: string,
//     icon: string,
//     open: boolean,

// }

const initialState = {tasks: []}
// const initialCounterState = { counter: 0, showCounter: true };

export const programSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    set: (state, action) => {
      state.tasks.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { set } = programSlice.actions

export default programSlice.reducer