import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import MultiDatePicker from 'react-multi-date-picker';
import { axiosExerciseDB } from '../../APIs/axios';
import './index.scss';

const ExercisePopUp = ({ exercise, onClose }) => {
    const [exerciseInfo, setExerciseInfo] = useState({});
    const [days, setDays] = useState(
        exercise.days.map(day => ({ value: day, label: day }))
    );
    const [dates, setDates] = useState(exercise.dates.map(date => new Date(date)));
    const [reps, setReps] = useState(exercise.reps);
    const [sets, setSets] = useState(exercise.sets);
    const [weight, setWeight] = useState(exercise.weight);
    const [initialValues] = useState({
        days: [...exercise.days],
        dates: [...exercise.dates],
        reps: exercise.reps,
        sets: exercise.sets,
        weight: exercise.weight
    });

    const dayOptions = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ].map(day => ({ value: day, label: day }));

    const hasChanges = () => {
        return (
            days.map(day => day.value).sort().join(',') !== initialValues.days.sort().join(',') ||
            dates.map(date => date.toISOString()).sort().join(',') !== initialValues.dates.map(date => new Date(date).toISOString()).sort().join(',') ||
            reps !== initialValues.reps || 
            sets !== initialValues.sets || 
            weight !== initialValues.weight
        );
    };

    useEffect(() => {
        async function fetchExercises() {
            try {
                const response = await axiosExerciseDB.get(`/exercises/exercise/${exercise.external_workout_id}`);
                setExerciseInfo(response.data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        }

        fetchExercises();
    }, [exercise.external_workout_id]);

    return ReactDOM.createPortal(
        <>
            <div className='popup-overlay' />
            <div className='card-pop-up'>
                <div className='pop-up-header'>
                    <button
                        className={`update-button ${hasChanges() ? 'active' : 'disabled'}`}
                        disabled={!hasChanges()}
                        onClick={() => {
                            // Handle update logic here
                        }}
                    >
                        Update
                    </button>
                    <button className='close-button' onClick={onClose}>Close</button>
                </div>
                <div className='pop-up-content'>
                    <h1>{exercise.name}</h1>
                    <div className='exercise-info'>
                        <img className='exercise-gif' src={exerciseInfo.gifUrl} alt={exerciseInfo.name} />
                        <div className='exercise-details'>
                            <ul>
                                <li>
                                    <label htmlFor='reps'>Reps:</label>
                                    <input
                                        type='number'
                                        value={reps}
                                        onChange={(e) => setReps(parseInt(e.target.value))}
                                        min='0'
                                    />
                                </li>
                                <li><label htmlFor='sets'>Sets:</label>
                                    <input
                                        type='number'
                                        value={sets}
                                        onChange={(e) => setSets(parseInt(e.target.value))}
                                        min='0'
                                    />
                                </li>
                                <li>
                                    <label htmlFor='weight'>Weight:</label>
                                    <input
                                        type='number'
                                        value={weight}
                                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                                        min='0'
                                        step='2.5'
                                    />
                                </li>
                                <li>
                                    <label htmlFor='days'>Days:</label>
                                    <Select
                                        options={dayOptions}
                                        isMulti
                                        value={days}
                                        onChange={(e) => setDays(e)}
                                        placeholder="Select Days"
                                    />
                                </li>
                                <li>
                                    <label htmlFor='dates'>Dates: </label>
                                    <MultiDatePicker
                                        value={dates}
                                        onChange={(e) => setDates(e)}
                                        placeholder="Select Dates"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='instructions'>
                        <h3>Instructions</h3>
                        <ul>
                            {exerciseInfo.instructions?.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default ExercisePopUp;
