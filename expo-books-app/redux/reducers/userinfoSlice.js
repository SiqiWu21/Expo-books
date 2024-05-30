import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    userinfo: null
};

const userinfoSlice = createSlice({
    name: 'userinfo',
    initialState,
    reducers: {
        updateUserinfo(state, {
            payload
        }) {
            // console.log("payload = ", payload)
            state.userinfo = payload;
        }
    },
});

export const {
    updateUserinfo
} = userinfoSlice.actions;
export default userinfoSlice.reducer;