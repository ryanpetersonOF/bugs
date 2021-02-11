import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,
    },
    reducers: {
        increment: (state) => {
            state.count = state.count + 1;
        },
        decrement: (state) => {
            state.count = state.count - 1;
        }
    },
});
export default slice.reducer
export const { increment, decrement } = slice.actions;
