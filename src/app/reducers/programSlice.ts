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
      const {uuid, min} = action.payload;

      let foundObject = state.tasks.find((obj: any) => obj.uuid === uuid);
      if (foundObject) { foundObject['min'] = min; };
    },
    setMax: (state, action) => {
      const {uuid, max} = action.payload;

      let foundObject = state.tasks.find((obj: any) => obj.uuid === uuid);
      if (foundObject) { foundObject['max'] = max; };
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
      if (foundObject) { foundObject['windowRef'] = ref; } 
      else { console.log("Object not found with UUID:", action.payload); }
      // state.tasks[index] = {...state.tasks[index], ref: action.payload}
    },
    setTaskRef: (state, action) => {
      const {uuid, ref} = action.payload
      let foundObject = state.tasks.find((obj: any) => obj.uuid === uuid);
      if (foundObject) { foundObject['taskRef'] = ref; }
      else { console.log("Object not found with UUID:", action.payload) }
    },
    setCopyRef: (state, action) => {
      const {uuid, ref} = action.payload;
      console.log('REF IN SLICE: ', ref)
      let foundObject = state.tasks.find((obj: any) => obj.uuid === uuid);
      if (foundObject) { foundObject['copyRef'] = ref; }
      else { console.log("Object not found with UUID:", action.payload) }
    }
  },
})

// Action creators are generated for each case reducer function
export const { set, close, setMin, setMax, focus, setWindowRef, setTaskRef, setCopyRef } = programSlice.actions

export default programSlice.reducer