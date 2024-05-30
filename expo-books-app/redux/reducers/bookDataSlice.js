import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    bookData: []
};

const bookDataSlice = createSlice({
    name: 'bookData',
    initialState,
    reducers: {
        updateBookData(state, {
            payload
        }) {
            state.bookData = payload;
        }
    },
});

export const {
    updateBookData
} = bookDataSlice.actions;
export default bookDataSlice.reducer;