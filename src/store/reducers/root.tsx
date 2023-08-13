import {combineReducers} from "redux";
import {State} from "../../types";
import users from "../slices/users";
import comments from "../slices/comments";

export default combineReducers<State>({
    usersState: users.reducer,
    commentsState: comments.reducer,
});
