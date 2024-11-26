import PropTypes from 'prop-types';
import moment from 'moment';

/**
 * DateHeading component displays a formatted date based on the provided date prop.
 *
 * The formatting logic displays:
 * - "Today" if the date is today.
 * - The day of the week if the date is within the current week.
 * - The month and day if the date is within the current year.
 * - The full date (month, day, and year) for all other dates.
 *
 * @param {string} date - The date to format and display.
 * @returns {string} Formatted date string.
 */
const DateHeading = ({ date }) => {
    const today = moment().startOf('day');
    const selectedDate = moment(date).startOf('day');
  
    if (selectedDate.isSame(today, 'day')) {
      return "Today";
    } else if (selectedDate.isSame(today, 'week')) {
      return moment(date).format('dddd');
    } else if (selectedDate.isSame(today, 'year')) {
      return moment(date).format('MMMM Do');
    } else {
      return moment(date).format('MMMM Do YYYY');
    }
}

// PropTypes validation
DateHeading.propTypes = {
  date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
  ]).isRequired,
};
export default DateHeading;