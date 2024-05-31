import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    fontSize: 14
};

const fontSizeSlice = createSlice({
    name: 'fontSize',
    initialState,
    reducers: {
        updateFontSize(state, {
            payload
        }) {
            state.fontSize = payload;
        }
    },
});

export const {
    updateFontSize
} = fontSizeSlice.actions;
export default fontSizeSlice.reducer;