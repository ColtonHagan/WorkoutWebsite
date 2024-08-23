const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const decodeDays = (days) => {
    console.log(weekDays.filter((_, index) => days & (1 << index)));
    return weekDays.filter((_, index) => days & (1 << index));
};

const encodeDays = (days) => {
    console.log("equals", days.reduce((acc, day) => {
        const index = weekDays.indexOf(day);
        return acc | (1 << index);
    }, 0));
    return days.reduce((acc, day) => {
        const index = weekDays.indexOf(day);
        return acc | (1 << index);
    }, 0);
};

module.exports = {
    decodeDays,
    encodeDays
};
