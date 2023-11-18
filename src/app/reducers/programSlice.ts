import { createSlice } from '@reduxjs/toolkit';

// type Program = {
//     title: string,
//     icon: string,
//     open: boolean,

// }

type TestState = Array<any>;

const initialState = {tasks: []};
// const initialCounterState = { counter: 0, showCounter: true };

export const programSlice = createSlice({
  name: 'tasks',
  initialState,
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
    },
    maximize: (state, action) => {
      let tasks = JSON.parse(JSON.stringify(state.tasks));
      console.log('TASKS B4 OPS: ', tasks)
      // const found = tasks.find((el: any)=>{return el['uuid'] = action.payload})
      // const index = tasks.findIndex((el: any) => el['uuid'] = action.payload);
      // tasks[index] = {...tasks[index], max: true}

      let foundObject = state.tasks.find((obj: any) => obj.uuid === action.payload);

      // If the object is found, add the new property
      if (foundObject) {
        foundObject['max'] = true;
      } else {
        console.log("Object not found with UUID:", action.payload);
      }

      console.log('TASKS IN SLICE: ', JSON.parse(JSON.stringify(state.tasks)))

      // state.tasks[index] = {...state.tasks[index], max: true}
      // state.tasks = {...state.tasks}
    }
  },
})

// Action creators are generated for each case reducer function
export const { set, close, minimize, maximize } = programSlice.actions

export default programSlice.reducer