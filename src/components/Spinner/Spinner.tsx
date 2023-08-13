import React from "react";
import css from "./Spinner.module.scss";

interface SpinnerProps {
    className?: string;
}

const Spinner = ({className}: SpinnerProps) => {
    return (
        <div className={className}>
            <div className={css.spinner}></div>
        </div>
    );
};

export default Spinner;
