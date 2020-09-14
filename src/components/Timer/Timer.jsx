import React, { useEffect, useState } from 'react';
import { msToTime } from '../../utils';

const initialTime = {
    hours: '',
    minutes: '',
    seconds: ''
}

export default function Timer({ start, reset}) {
    const [date, setDate] = useState(null);
    const [elapsed, setElapsed] = useState(0);
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (start) setDate(new Date());
    }, [start]);

    useEffect(() => {
        if (reset) setElapsed(0)
    }, [reset])

    useEffect(() => {
        let timerID = null;

        if (start) {
            timerID = setInterval(() => {
                const elapsed = Date.now() - date;
                setElapsed(elapsed);
            }, 60);
        }

        return () => clearInterval(timerID);
    }, [start, date]);

    useEffect(() => {
        const { hours, minutes, seconds } = msToTime(elapsed);
        setTime({ hours, minutes, seconds });
    }, [elapsed]);

    return (
        <span>
            <span>{ time.hours }</span>:<span>{ time.minutes }</span>:<span>{ time.seconds }</span>
        </span>
    );
}
