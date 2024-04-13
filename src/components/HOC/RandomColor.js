import moment from "moment";
import React from "react";

const getRandomColor = () => {
    const startColor = `rgb(${(Math.floor(Math.random() * 128) + 128)}, ${(Math.floor(Math.random() * 128) + 128)}, ${(Math.floor(Math.random() * 128) + 128)})`;
    const endColor = `rgb(${(Math.floor(Math.random() * 128) + 128)}, ${(Math.floor(Math.random() * 128) + 128)}, ${(Math.floor(Math.random() * 128) + 128)})`;
    return `linear-gradient(to right, ${startColor}, ${endColor})`
}

const countSong = (listSong) => {
    return listSong.length
}

const totalTime = (listSong) => {
    let totalTime = 0
    if (listSong) {
        for (let i = 0; i < listSong.length; i++) {
            totalTime += listSong[i].durationTime
        }
    }
    return totalTime
}

const calcuDate = (date) => {
    let dateTime = moment.utc(date).format('MM/DD/YYYY');
    let today = moment().format('MM/DD/YYYY');
    let numberDiff = moment(dateTime).diff(moment(today), 'seconds');
    let daysDiff = Math.abs(numberDiff)
    let result = "";

    if (daysDiff > 2629744) {
        result = `${Math.floor(daysDiff / 2629744)} month`;
    } else if (daysDiff > 86400) {
        result = `${Math.floor(daysDiff / 86400)} d`;
    } else if (daysDiff > 3600) {
        result = `${Math.floor(daysDiff / 3600)} h`;
    } else {
        result = `${Math.floor(daysDiff / 60)} m`;
    }
    return result;
}


export {
    getRandomColor,
    totalTime,
    countSong,
    calcuDate
};
