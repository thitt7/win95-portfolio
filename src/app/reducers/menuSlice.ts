import { createSlice } from '@reduxjs/toolkit';
import programs from '../../../public/programs.json';

// const [program, setProgram] = useState(programs[`${name as keyof typeof programs}`])

const initialState = {menu: [
    {"title":"Resume","formattedTitle":"Resume","id":"resume","body":"<iframe src='/resume.pdf#view=fitH' title='Resume' height='100%' width='100%' />","toolbar":"","icon":"document-0.ico","type":"text","filename":"resume.pdf","permissions":"r"},
    {"title":"Github","formattedTitle":"Github","id":"github","body":"<iframe src='https://github.com/thitt7' title='Github' height='100%' width='100%' />","toolbar":"","icon":"github.svg","type":"text","filename":"github.exe","permissions":"r"},
    {"title":"Internet Explorer","formattedTitle":"Internet Explorer","id":"iexplorer","body":"","toolbar":"","icon":"iexplorer.ico","type":"text","filename":"iexplorer.exe","permissions":"r"},
    {"title":"Settings","formattedTitle":"Settings","body":"","toolbar":"","icon":"w95_22.ico","type":"text","filename":"cpanel.exe","permissions":"r"}
]};

// const initialCounterState = { counter: 0, showCounter: true };

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    set: (state, action: any) => {
        state.menu = [...state.menu, ...action.payload]
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