export const calculateTimeElapsed = (targetDate) => {
    const targetTime = new Date(targetDate);
    const currentTime = new Date();
    const timeDifference = currentTime - targetTime;
    const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursElapsed = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutesElapsed = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );

    let timeElapsedString = '';

    if (daysElapsed > 0) {
        timeElapsedString += `${daysElapsed} giorn${
            daysElapsed > 1 ? 'i' : 'o'
        } `;
    }

    if (hoursElapsed > 0) {
        timeElapsedString += `${hoursElapsed} or${
            hoursElapsed > 1 ? 'e' : 'a'
        } `;
    }

    if (minutesElapsed > 0) {
        timeElapsedString += `${minutesElapsed} minut${
            minutesElapsed > 1 ? 'i' : 'o'
        } `;
    }

    return timeElapsedString;
};
