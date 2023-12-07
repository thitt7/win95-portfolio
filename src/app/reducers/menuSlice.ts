import { createSlice } from '@reduxjs/toolkit';
import programs from '../../../public/programs.json';

// const [program, setProgram] = useState(programs[`${name as keyof typeof programs}`])

const initialState = {menu: []};
// const initialCounterState = { counter: 0, showCounter: true };

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    set: (state, action: any) => {
        state.menu = {...state.menu, ...action.payload}
      },
    add: (state, action: any) => {
        const program = programs[`${action.payload as keyof typeof programs}`];
        state.menu.push(program);
    },
    remove: (state, action: any) => {
        const i = state.menu.findIndex((obj: any) => obj.uuid === action.payload);
        delete state.menu[i];
    }
  },
})

// Action creators are generated for each case reducer function
export const { set, add, remove } = menuSlice.actions

export default menuSlice.reducer;