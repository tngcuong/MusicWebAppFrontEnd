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
        if (Math.floor(daysDiff / 2629744) > 1) {
            result = `${Math.floor(daysDiff / 2629744)} months`;
        }
        result = `${Math.floor(daysDiff / 2629744)} month`;
    } else if (daysDiff > 86400) {
        if (Math.floor(daysDiff / 86400) > 1) {
            result = `${Math.floor(daysDiff / 86400)} day`;
        }
        result = `${Math.floor(daysDiff / 86400)} days`;
    } else if (daysDiff > 3600) {
        if (Math.floor(daysDiff / 3600) > 1) {
            result = `${Math.floor(daysDiff / 3600)} hours`;
        }
        result = `${Math.floor(daysDiff / 3600)} hour`;
    } else {
        if (Math.floor(daysDiff / 60) > 1) {
            result = `${Math.floor(daysDiff / 60)} minutes`;
        }
        result = `${Math.floor(daysDiff / 60)} minute`;
    }
    return result;
}

function randomUniqueString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}



export {
    getRandomColor,
    totalTime,
    countSong,
    calcuDate,
    randomUniqueString,
    isEmpty
};
