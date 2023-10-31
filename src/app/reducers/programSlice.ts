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
    set: (state, action: any) => {
      state.tasks.push(action.payload)
    },
    close: (state, action) => {
      let tasks = JSON.parse(JSON.stringify(state.tasks));
      let replaced = tasks.map((i: any)=>{
        if (i['uuid'] == action.payload) {return {}}
        else {return i}
      })

      let length = 0;
      for (const el of replaced) {
        length += Object.keys(el).length
      }

      if (length == 0) {state.tasks = []}
      else {state.tasks = replaced}
      // state.tasks = tasks.filter((i: any)=>{return i['uuid'] !== action.payload})
      
    },
    minimize: (state, action) => {
      let tasks = JSON.parse(JSON.stringify(state.tasks));
      tasks = {...tasks, windowed: false}
      state.tasks = {...tasks}
    }
  },
})

// Action creators are generated for each case reducer function
export const { set, close } = programSlice.actions

export default programSlice.reducer