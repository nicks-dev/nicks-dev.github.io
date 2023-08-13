import {CommentState, CommentType} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchComments} from "../thunks/comments-thunk";

const initialState: CommentState = {
    comments: [],
    currentPage: 1,
    totalPages: 1,
    dataLoaded: false,
};

const commentsSlice = createSlice({
    name: "comments-reducer",
    initialState,
    reducers: {
        setNextStep: (state: CommentState, action: PayloadAction) => {
            state.currentPage += 1;
        },
        toggleLike: (
            state: CommentState,
            action: PayloadAction<{commentId: number; isLiked: boolean}>,
        ) => {
            const {commentId, isLiked} = action.payload;

            const allCommentsArray: CommentType[] = [];
            state.comments.forEach((item) => {
                allCommentsArray.push(...item.data);
            });
            const likedComment = allCommentsArray.find(
                (item) => item.id === commentId,
            );
            console.log(likedComment);
            if (likedComment) {
                isLiked
                    ? (likedComment.likes += 1)
                    : (likedComment.likes = likedComment.likes - 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchComments.pending,
            (state: CommentState, action) => {
                // console.log("comments loading");
            },
        );
        builder.addCase(
            fetchComments.fulfilled,
            (state: CommentState, action) => {
                if (!state.dataLoaded) {
                    state.comments = action.payload;
                    state.totalPages = action.payload[0].pagination.total_pages;
                    state.dataLoaded = true;
                }
                // console.log("comments loaded");
            },
        );
        builder.addCase(
            fetchComments.rejected,
            (state: CommentState, action) => {
                // console.log("comments loading failed", action);
            },
        );
    },
});

export const {setNextStep, toggleLike} = commentsSlice.actions;
export default commentsSlice;
