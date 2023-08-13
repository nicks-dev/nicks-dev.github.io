import React from "react";
import {CommentType} from "../../types";
import css from "./CommentList.module.scss";
import CommentItem from "../CommentItem/CommentItem";
import clsx from "clsx";

interface CommentListProps {
    comments: CommentType[];
    active: boolean;
}

const CommentList = ({comments, active = false}: CommentListProps) => {
    const commentsWithChildren: CommentType[] = [];
    // 1. Создаем стек, куда фильтруем все комментарии, являющиеся "родительскими",
    // 2. модернизируем каждый комментарий, добавляя поле с ответами replies.
    const stack: CommentType[] = comments
        .filter((comment) => comment.parent === null)
        .map((comment) => ({...comment, replies: []}));

    // 3. Вырезаем по одному комментарию из стека, проверяем его на вложенность и проходим по циклу, пока стек не опустеет.
    while (stack.length > 0) {
        const currentComment = stack.pop()!;
        commentsWithChildren.push(currentComment);

        // 4. Ищем его "детей" из массива всех комментариев.
        const children = comments.filter(
            (comment) => comment.parent === currentComment.id,
        );

        // 5. Если находится хоть один "ребенок", то добавляем его в массив replies текущего комментария,
        // и, если у детей есть свои дети, то мы их тоже добавляем в стек для обработки на следующей итерации
        if (children.length > 0) {
            children.forEach((child) => {
                const commentWithChildren: CommentType = {
                    ...child,
                    replies: [],
                };
                currentComment.replies?.push(commentWithChildren);
                stack.push(commentWithChildren);
            });
        }
    }

    // 6. итоговый массив включает в себя все комментарии с их дочерними комментариями,
    // остаётся только отсортировать от старых к новым(по id или дате создания) и оставить в результирующем массиве только "корневые" комментарии
    const resultArray = commentsWithChildren
        .sort((a, b) => a.id - b.id)
        .filter((item, index) => {
            return item.parent === null;
        });

    // P.S. По идее можно сортировать как по id (т.к. более чем меньше id, тем старее комментарий),
    // либо по времени создания, но в моках есть небольшая ошибка с датой.
    // Увидеть это можно на примере с репликой Палпатина - у него более старый id, но при этом время создания "отформатировано" под более раннее время.
    return (
        <ul className={clsx(css.list, active && css.active)}>
            {resultArray.map((comment, index) => (
                <CommentItem
                    className={css.item}
                    key={`${comment.id} - ${comment.author}`}
                    {...comment}
                />
            ))}
        </ul>
    );
};

export default CommentList;
