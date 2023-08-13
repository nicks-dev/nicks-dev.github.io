import React, {useEffect, useState} from "react";
import {useSelector} from "../../store/store";
import clsx from "clsx";
import css from "./LoadingScreen.module.scss";
import Spinner from "../Spinner/Spinner";

const LoadingScreen = () => {
    const {dataLoaded} = useSelector((state) => state.commentsState);
    const [visible, setVisibility] = useState(true);

    useEffect(() => {
        if (dataLoaded) {
            setTimeout(() => {
                setVisibility(false);
            }, 500);
        }
    }, [dataLoaded]);

    return (
        <div className={clsx(css.loading, !visible && css.hidden)}>
            <p>
                Загружаем комментарии...
                <br /> Подождите, пожалуйста
            </p>
            <Spinner className={css.spinner} />
        </div>
    );
};

export default LoadingScreen;
