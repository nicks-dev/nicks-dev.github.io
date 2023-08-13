import React, {useState} from "react";
import clsx from "clsx";
import {setNextStep} from "../../store/slices/comments";
import {useDispatch} from "../../store/store";
import Spinner from "../Spinner/Spinner";
import css from "./LoadMoreButton.module.scss";

interface LoadMoreButtonProps {
    className?: string;
}

const LoadMoreButton = ({className}: LoadMoreButtonProps) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    // имитируем фетч
    const onLoadMoreButtonClick = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            // dispatch можно прокинуть хендлером с родительского компонента (вынести логику, не привязанную к этому компоненту),
            // если нам нужна была бы эта кнопка еще где-то, а не только для пагинации комментариев
            dispatch(setNextStep());
        }, 1000);
    };

    return (
        <button
            className={clsx(className, css.button, loading && css.loading)}
            type={"button"}
            onClick={onLoadMoreButtonClick}
        >
            <Spinner className={css.spinner} />
            <span className={css.text}>Загрузить ещё</span>
        </button>
    );
};

export default LoadMoreButton;
