import {UserState} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "../thunks/users-thunk";

const initialState: UserState = {
    users: [],
};

const usersSlice = createSlice({
    name: "users-reducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state: UserState, action) => {
            // console.log('users loading');
        });
        builder.addCase(fetchUsers.fulfilled, (state: UserState, action) => {
            state.users = action.payload;
            // console.log('users loaded');
        });
        builder.addCase(fetchUsers.rejected, (state: UserState, action) => {
            // console.log('users loading failed', action);
        });
    },
});

export default usersSlice;
