import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {CommentData} from "../../types";
import getCommentsRequest from "../../api/comments/getCommentsRequest";
import axiosRetry from "axios-retry";

// можно было бы обрабатывать второй запрос с ошибкой через цепочку промисов и setTimeout,
// но раз уж в проекте есть axios, то почему бы не воспользоваться его возможностями?
axiosRetry(axios, {retries: 2});

// гружу сразу все страницы комментариев, так как нам как-то надо получить количество комментариев и лайков
// для получения их количества нет отдельного эндпоинта, так что единственный вариант - загрузить разом всё и посчитать
export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async () => {
        const [commentsPage1, commentsPage2, commentsPage3] =
            await axios.all<CommentData>([
                getCommentsRequest(1),
                getCommentsRequest(2),
                getCommentsRequest(3),
            ]);
        return [commentsPage1, commentsPage2, commentsPage3];
    },
);
