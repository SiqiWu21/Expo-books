import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    type: []
};

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        updateType(state, {
            payload
        }) {
            state.type = payload;
        }
    },
});

export const {
    updateType
} = typeSlice.actions;
export default typeSlice.reducer;