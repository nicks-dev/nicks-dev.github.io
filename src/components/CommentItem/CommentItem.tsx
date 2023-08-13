import React, {useEffect, useState} from "react";
import css from "./CommentItem.module.scss";
import {CommentType, User} from "../../types";
import mockAvatar from "src/assets/avatars/chew.jpeg";
import HeartIcon from "../Icons/HeartIcon/HeartIcon";
import {thousandSeparator} from "../../lib/thousandSeparator";
import clsx from "clsx";
import {formatTime} from "../../lib/date";
import {useDispatch, useSelector} from "../../store/store";
import CommentListInner from "../CommentList/CommentListInner";
import {toggleLike} from "../../store/slices/comments";

interface CommentItemProps extends CommentType {
    className?: string;
}

const CommentItem = ({
    className,
    id,
    author,
    created,
    likes,
    text,
    replies,
}: CommentItemProps) => {
    const [liked, setLike] = useState(false);
    const [user, setUser] = useState<User>();
    const {users} = useSelector((state) => state.usersState);
    const dispatch = useDispatch();

    const onLikeClick = () => {
        dispatch(toggleLike({commentId: id, isLiked: !liked}));
        setLike(!liked);
    };

    useEffect(() => {
        const ourUser = users.find((item, index) => item.id === author);
        setUser(ourUser);
    }, [author, users]);

    return (
        <li className={clsx(className, css.item)}>
            <div className={css.item__wrapper}>
                <div className={css.item__avatar}>
                    <img
                        width={68}
                        height={68}
                        src={user?.avatar ? user?.avatar : mockAvatar}
                        alt={"mock avatar"}
                    />
                </div>
                <div className={css.item__body}>
                    <div className={css.item__info}>
                        <div className={css.item__left}>
                            <div className={css.item__author}>{user?.name}</div>
                            <div className={css.item__time}>
                                {formatTime(created)}
                            </div>
                        </div>
                        <div className={css.item__right}>
                            <button
                                className={css.item__likes}
                                onClick={onLikeClick}
                            >
                                <HeartIcon filled={liked} />
                                <span>{thousandSeparator(likes)}</span>
                            </button>
                        </div>
                    </div>
                    <div className={clsx(css.item__commentText, "text")}>
                        {text}
                    </div>
                </div>
            </div>
            {replies && replies.length > 0 && (
                <CommentListInner
                    className={css.innerList}
                    comments={replies}
                />
            )}
        </li>
    );
};

export default CommentItem;
