function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}

// 3700000(ms) → 01(h):01(m):40(s)
function msToTime(ms) {
    const hours = String(Math.floor(ms / 1000 / 60 / 60) + 100).substring(1);
    const minutes = String(Math.floor((ms % (1000 * 60 * 60)) / 1000 / 60) + 100).substring(1);
    const seconds = String(Math.floor((ms % (1000 * 60)) / 1000) + 100).substring(1);
    return { hours, minutes, seconds };
}


export {
    shuffle,
    msToTime
};
