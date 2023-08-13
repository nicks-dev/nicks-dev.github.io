import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {User} from "../../types";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const {data} = await axios.get<User[]>("/api/authors");
    return data;
});
