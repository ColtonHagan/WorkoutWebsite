import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import SimpleExerciseCard from './components/SimpleExerciseCard';
import moment from 'moment';
import './index.scss';

/**
 * WeeklyDisplay component displays exercises organized by days of the week.
 * 
 * @param {Array} exercises - List of exercise objects to display.
 * @param {Function} onExerciseClick - Function when an exercise is clicked.
 * @param {Function} deleteWorkout - Function to delete a workout.
 */
const WeeklyDisplay = ({ exercises, onExerciseClick, deleteWorkout }) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Misc"];
    const [workoutsByDay, setWorkoutsByDay] = useState({});

    useEffect(() => {
        const today = moment();
        const nextMonth = moment().add(1, 'months');
        const updatedWorkoutsByDay = daysOfWeek.reduce((acc, day) => {
            acc[day] = [];
            return acc;
        }, {});

        exercises.forEach(workout => {
            if (workout.days.length > 0) {
                workout.days.forEach(day => {
                    if (!updatedWorkoutsByDay[day]) {
                        updatedWorkoutsByDay[day] = [];
                    }
                    updatedWorkoutsByDay[day].push(workout);
                });
            }
            const validDates = workout.dates.filter(date => moment(date).isBetween(today, nextMonth));
            if (validDates.length > 0) {
                updatedWorkoutsByDay['Misc'].push(workout);
            }
        });

        if (JSON.stringify(updatedWorkoutsByDay) !== JSON.stringify(workoutsByDay)) {
            setWorkoutsByDay(updatedWorkoutsByDay);
        }

        setWorkoutsByDay(updatedWorkoutsByDay);
    }, [exercises]);

    const filteredDaysOfWeek = useMemo(() => {
        return daysOfWeek.filter(day => workoutsByDay[day]?.length > 0);
    }, [workoutsByDay, daysOfWeek]);

    return (
        <div className="weekly-display">
            <table>
                <thead>
                    <tr>
                        {filteredDaysOfWeek.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {filteredDaysOfWeek.map(day => (
                            <td key={day}>
                                {workoutsByDay[day].map((workout, index) => (
                                    <SimpleExerciseCard key={index} exercise={workout} onDelete={deleteWorkout} onExerciseClick={onExerciseClick} />
                                ))}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

WeeklyDisplay.propTypes = {
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
            reps: PropTypes.number,
            sets: PropTypes.number,
            weight: PropTypes.number,
            days: PropTypes.arrayOf(PropTypes.string),
            dates: PropTypes.arrayOf(PropTypes.string),
            bodyPart: PropTypes.string,
            target: PropTypes.string,
            instructions: PropTypes.arrayOf(PropTypes.string),
            gif: PropTypes.string,
        })
    ),
    onExerciseClick: PropTypes.func,
    deleteWorkout: PropTypes.func,
};

export default WeeklyDisplay;
