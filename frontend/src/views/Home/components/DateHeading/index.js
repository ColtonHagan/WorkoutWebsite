import moment from 'moment';
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
export default DateHeading;