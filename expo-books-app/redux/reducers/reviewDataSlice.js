import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    reviewData: []
};

const reviewDataSlice = createSlice({
    name: 'reviewData',
    initialState,
    reducers: {
        updateReviewData(state, {
            payload
        }) {
            state.reviewData = payload;
        }
    },
});

export const {
    updateReviewData
} = reviewDataSlice.actions;
export default reviewDataSlice.reducer;