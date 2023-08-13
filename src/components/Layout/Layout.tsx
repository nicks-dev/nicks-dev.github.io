import React from "react";
import css from "./Layout.module.scss";
import {useSelector} from "../../store/store";
import CommentList from "../CommentList/CommentList";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Header from "../Header/Header";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Layout = () => {
    const {comments, currentPage, totalPages} = useSelector(
        (state) => state.commentsState,
    );

    return (
        <>
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
        </>
    );
};

export default Layout;
