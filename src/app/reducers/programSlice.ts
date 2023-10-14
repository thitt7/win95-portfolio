import { createSlice } from '@reduxjs/toolkit';

type Program = {
    title: string,
    icon: string,
    open: boolean,

}

const initialState = {tasks: [], startMenu: [], bin: []}

export const programSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    set: (state, action) => {
      state = {...state, [action.payload]: action.payload}
    },
  },
})

// Action creators are generated for each case reducer function
export const { set } = programSlice.actions

export default programSlice.reducer