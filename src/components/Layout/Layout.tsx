import React, {useEffect, useState} from "react";
import css from "./Layout.module.scss";
// import Header from "../Header/Header";
import background from "../../assets/images/background@2x.png";
import {useDispatch, useSelector} from "../../store/store";
import CommentList from "../CommentList/CommentList";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import {CommentData, CommentType} from "../../types";
import Header from "../Header/Header";
import clsx from "clsx";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Layout = () => {
    // const [commentsList, setCommentsList] = useState<CommentData[]>([]);
    const {comments, currentPage, totalPages} = useSelector(
        (state) => state.commentsState,
    );

    useEffect(() => {
        if (comments.length > 0) {
            console.log(comments, "comments 1");
        }
    }, []);

    return (
        <main className="app">
            <div className="app__background">
                <img src={background} alt={""} />
            </div>

            <LoadingScreen />

            <div className={css.layout}>
                <div className={css.layout__wrapper}>
                    <div className={css.layout__content}>
                        <Header />

                        {comments.map((item, index) => (
                            <CommentList
                                key={item.pagination.page}
                                comments={item.data}
                                active={index + 1 <= currentPage}
                            />
                        ))}

                        {currentPage < totalPages && (
                            <LoadMoreButton
                                className={css.layout__loadMoreButton}
                            />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Layout;
