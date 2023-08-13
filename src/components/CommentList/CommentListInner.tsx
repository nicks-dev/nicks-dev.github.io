import React from "react";
import {CommentType} from "../../types";
import css from "./CommentList.module.scss";
import CommentItem from "../CommentItem/CommentItem";

interface CommentListProps {
    comments: CommentType[];
    className?: string;
}

const CommentListInner = ({comments, className}: CommentListProps) => {
    return (
        <ul className={className}>
            {comments.map((comment, index) => (
                <CommentItem
                    className={css.item}
                    key={`${comment.id}`}
                    {...comment}
                />
            ))}
        </ul>
    );
};

export default CommentListInner;
