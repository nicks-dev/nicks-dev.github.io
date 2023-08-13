import React, {useEffect, useState} from "react";
import HeartIcon from "../Icons/HeartIcon/HeartIcon";
import css from "./Header.module.scss";
import HeaderLineIcon from "../Icons/HeaderLineIcon/HeaderLineIcon";
import {thousandSeparator} from "../../lib/thousandSeparator";
import {useSelector} from "../../store/store";
import {getWordEnding} from "../../lib/getWordEnding";
import {CommentType} from "../../types";

const Header = () => {
    const [commentsArray, setCommentsArray] = useState<CommentType[]>([]);
    const {comments} = useSelector((state) => state.commentsState);
    const [likesCounter, setLikesCount] = useState<number>(0);

    const countLikes = (array: CommentType[]) =>
        array.reduce((acc, currentValue) => acc + currentValue.likes, 0);

    useEffect(() => {
        const allCommentsArray: CommentType[] = [];
        comments.forEach((item) => {
            allCommentsArray.push(...item.data);
            setCommentsArray([...allCommentsArray]);
        });
    }, [comments]);

    useEffect(() => {
        if (commentsArray.length > 0) {
            setLikesCount(countLikes(commentsArray));
        }
    }, [commentsArray]);

    return (
        <header className={css.header}>
            <div className={css.header__comments}>
                <span>
                    {commentsArray.length > 0 ? commentsArray.length : 0}
                </span>
                <span>
                    {commentsArray.length > 0
                        ? getWordEnding(
                              commentsArray.length,
                              "комментарий",
                              "комментария",
                              "комментариев",
                          )
                        : "комментариев"}
                </span>
            </div>
            <div className={css.header__likes}>
                <HeartIcon staticIcon />
                <span className={css.header__likesCount}>
                    {thousandSeparator(likesCounter)}
                </span>
            </div>
            <div className={css.header__line}>
                <HeaderLineIcon />
            </div>
        </header>
    );
};

export default Header;
