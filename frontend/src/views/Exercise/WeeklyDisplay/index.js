import { useState, useEffect } from 'react';
import './index.scss';
import SimpleExerciseCard from './components/SimpleExerciseCard';
import moment from 'moment';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Misc"];

const WeeklyDisplay = ({ exercises, deleteWorkout }) => {
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

        setWorkoutsByDay(updatedWorkoutsByDay);
    }, [exercises]);

    const filteredDaysOfWeek = daysOfWeek.filter(day => workoutsByDay[day] && workoutsByDay[day].length > 0);

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
                                    <SimpleExerciseCard key={index} exercise={workout} onDelete={(id) => deleteWorkout(id)} />
                                ))}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WeeklyDisplay;