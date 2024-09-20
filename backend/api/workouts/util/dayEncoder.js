const { createApiError } = require('../../../middleware/errorHandler');

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Decodes a bitmask representing workout days into an array of day names.
const decodeDays = (days) => {
    return weekDays.filter((_, index) => days & (1 << index));
};

// Encodes an array of day names into a bitmask.
const encodeDays = (days) => {
    return days.reduce((acc, day) => {
        const index = weekDays.indexOf(day);
        if (index === -1) throw createApiError(`Invalid day: ${day}`, 400);
        return acc | (1 << index);
    }, 0);
};

module.exports = {
    decodeDays,
    encodeDays
};
