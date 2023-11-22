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
      let replaced = state.tasks.map((i: any)=>{
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
    setMin: (state, action) => {
      let foundObject = state.tasks.find((obj: any) => obj.uuid === action.payload);
      if (foundObject) { foundObject['min'] = true; }
      else { console.log("Object not found with UUID:", action.payload); }
    },
    setMax: (state, action) => {
      // let tasks = JSON.parse(JSON.stringify(state.tasks));
      // const found = tasks.find((el: any)=>{return el['uuid'] = action.payload})
      // const index = tasks.findIndex((el: any) => el['uuid'] = action.payload);
      // tasks[index] = {...tasks[index], max: true}

      let foundObject = state.tasks.find((obj: any) => obj.uuid === action.payload);
      if (foundObject) { foundObject['max'] = true; }
      else { console.log("Object not found with UUID:", action.payload); }
    },
    focus: (state, action) => {
      const {uuid, active} = action.payload

      let foundObject = state.tasks.find((obj: any) => obj.uuid === uuid);
      if (foundObject) { foundObject['active'] = active; }
      else { console.log("Object not found with UUID:", action.payload); }
    },
    setWindowRef: (state, action) => {
      const {uuid, ref} = action.payload
      let foundObject = state.tasks.find((obj: any) => obj.uuid === uuid);
      if (foundObject) {
        foundObject['windowRef'] = ref;
      } 
      else { console.log("Object not found with UUID:", action.payload); }
      // state.tasks[index] = {...state.tasks[index], ref: action.payload}
    },
    setTaskRef: (state, action) => {
      const {uuid, ref} = action.payload
      let foundObject = state.tasks.find((obj: any) => obj.uuid === uuid);
      if (foundObject) { foundObject['taskRef'] = ref; }
      else { console.log("Object not found with UUID:", action.payload) }
    }
  },
})

// Action creators are generated for each case reducer function
export const { set, close, setMin, setMax, focus, setWindowRef, setTaskRef } = programSlice.actions

export default programSlice.reducer