import {getWordEnding} from "./getWordEnding";

export function subtractHours(date: Date, numOfHours: number) {
    const dateCopy = new Date(date.getTime());

    dateCopy.setHours(dateCopy.getHours() - numOfHours);

    return dateCopy;
}

export function formatTime(date: Date) {
    const now = new Date();
    const uglyDate = new Date(date);
    const day =
        uglyDate.getDate() > 9 ? uglyDate.getDate() : `0${uglyDate.getDate()}`;
    const month =
        uglyDate.getMonth() > 9
            ? uglyDate.getMonth()
            : `0${uglyDate.getMonth()}`;
    const hours =
        uglyDate.getHours() > 9
            ? uglyDate.getHours()
            : `${uglyDate.getHours()}`;
    const minutes =
        uglyDate.getMinutes() > 9
            ? uglyDate.getMinutes()
            : `0${uglyDate.getMinutes()}`;
    const seconds =
        uglyDate.getSeconds() > 9
            ? uglyDate.getSeconds()
            : `0${uglyDate.getSeconds()}`;
    const formattedDate = `${day}.${month}.${uglyDate.getFullYear()}, ${hours}:${minutes}:${seconds}`;
    const diffInMinutes = Math.floor((+now - +uglyDate) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInMinutes < 60) {
        return `${diffInMinutes} ${getWordEnding(
            diffInMinutes,
            "минуту",
            "минуты",
            "минут",
        )} назад`;
    }

    if (diffInHours < 24) {
        return `${diffInHours} ${getWordEnding(
            diffInHours,
            "час",
            "часа",
            "часов",
        )} назад`;
    }

    return formattedDate;
}
