import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import MultiDatePicker from 'react-multi-date-picker';
import Logo from '../../assets/Logo.png';
import ErrorMessage from '../ErrorMessage';
import { CapitalizeWords } from '../../util/CapitalizeWords';
import { removeTrailingAndTrim } from '../../util/removeTrailingAndTrim';
import useChatGPTService from '../../services/useChatGPTService';
import './index.scss';

const ExercisePopUp = ({ exercise, isEditing = true, onClose, onSubmit }) => {
    const { getNickname } = useChatGPTService();

    const [nickName, setNickName] = useState('');
    const [days, setDays] = useState(
        isEditing ? exercise.days.map(day => ({ value: day, label: day })) : []
    );
    const [dates, setDates] = useState(
        isEditing ? (exercise.dates ? exercise.dates.map(date => new Date(date)) : []) : []
    );
    const [reps, setReps] = useState(isEditing ? String(exercise.reps || "0") : "0");
    const [sets, setSets] = useState(isEditing ? String(exercise.sets || "0") : "0");
    const [weight, setWeight] = useState(isEditing ? String(exercise.weight || "0") : "0");
    const [errorMessage, setErrorMessage] = useState('');

    const initialValues = {
        days: isEditing ? [...exercise.days] : [],
        dates: isEditing ? [...exercise.dates] : [],
        reps: isEditing ? String(exercise.reps || "0") : "0",
        sets: isEditing ? String(exercise.sets || "0") : "0",
        weight: isEditing ? String(exercise.weight || "0") : "0"
    };

    const gif = useMemo(() => (
        isEditing ? exercise?.gif : `https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/${exercise.id}`
    ), [exercise.id, isEditing]);

    const fetchNickname = async (exerciseName) => {
        try {
            const response = await getNickname(exerciseName);
            return response.choices[0].message.content;
        } catch (error) {
            console.error("Error fetching nickname from ChatGPT:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchAndSetNickname = async () => {
            let nameToUse = exercise.name;
            if (nameToUse.length > 15) {
                nameToUse = (await fetchNickname(exercise.name)) || exercise.name;
            }
            setNickName(CapitalizeWords(removeTrailingAndTrim(nameToUse)));
        };

        fetchAndSetNickname();
    }, [exercise.name]);

    const dayOptions = useMemo(() => [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ].map(day => ({ value: day, label: day })), []);

    const hasChanges = () => {
        const formatDate = (date) => date instanceof Date ? date.toISOString() : new Date(date).toISOString();
        return (
            days.map(day => day.value).sort().join(',') !== initialValues.days.sort().join(',') ||
            dates.map(formatDate).sort().join(',') !== initialValues.dates.map(formatDate).sort().join(',') ||
            reps !== initialValues.reps ||
            sets !== initialValues.sets ||
            weight !== initialValues.weight
        );
    };

    const handleNumberInputChange = (e, setter) => {
        const value = e.target.value;
        setter(value === '' || isNaN(value) ? "" : parseInt(value, 10));
    };

    const handleWeightInputChange = (e) => {
        const value = e.target.value;
        setWeight(value === '' || isNaN(value) ? "" : parseFloat(value));
    };

    const handleSubmit = async () => {
        setErrorMessage('');

        if (days.length === 0 && dates.length === 0) {
            setErrorMessage('Please select a date/day for exercise');
            return;
        }

        try {
            const payload = {
                reps: parseInt(reps) || 0,
                sets: parseInt(sets) || 0,
                weight: parseFloat(weight) || 0,
                dates,
                days: days.map(day => day.value)
            };

            if (!isEditing) {
                payload.name = CapitalizeWords(exercise.name);
                payload.nickname = nickName;
                payload.gif = gif;
                payload.instructions = exercise?.instructions;
                payload.body_part = CapitalizeWords(exercise.bodyPart);
                payload.target = CapitalizeWords(exercise.target);
            }

            onSubmit(payload);
            onClose();
        } catch (error) {
            console.error('Error saving exercise:', error);
        }
    };

    return (
        <div className="exercise-pop-up-container">
            <div className='pop-up-header'>
                <h1 className='ellipsis'>{CapitalizeWords(exercise.name)}</h1>
            </div>
            <div className='pop-up-content'>
                <div className='exercise-info'>
                    <img className='exercise-gif' src={gif} alt={exercise.name} onError={(e) => e.target.src = Logo} />
                    <div className='exercise-details'>
                        {errorMessage && <ErrorMessage message={errorMessage} />}
                        <ul>
                            <li>
                                <label htmlFor='reps'>Reps:</label>
                                <input
                                    type='number'
                                    value={reps}
                                    onChange={(e) => handleNumberInputChange(e, setReps)}
                                    min='0'
                                />
                            </li>
                            <li>
                                <label htmlFor='sets'>Sets:</label>
                                <input
                                    type='number'
                                    value={sets}
                                    onChange={(e) => handleNumberInputChange(e, setSets)}
                                    min='0'
                                />
                            </li>
                            <li>
                                <label htmlFor='weight'>Weight:</label>
                                <input
                                    type='number'
                                    value={weight}
                                    onChange={handleWeightInputChange}
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
                                    className='react-select'
                                    onChange={(e) => setDays(e)}
                                    placeholder="Select Days"
                                />
                            </li>
                            <li>
                                <label htmlFor='dates'>Dates: </label>
                                <MultiDatePicker
                                    value={dates}
                                    onChange={(newDates) => {
                                        if (!newDates || !Array.isArray(newDates)) {
                                            setDates([]);
                                            return;
                                        }
                                        if (newDates?.isValid) return;

                                        const dateObjects = newDates
                                            .map(date => new Date(date))
                                            .filter(date => !isNaN(date));

                                        setDates(dateObjects);
                                    }}
                                    placeholder="Select Dates"
                                />
                            </li>
                            <div className='update-container'>
                                <button
                                    className={`button ${hasChanges() ? 'active' : 'disabled'}`}
                                    disabled={!hasChanges()}
                                    onClick={handleSubmit}>
                                    {isEditing ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className='instructions'>
                    <h3>Instructions</h3>
                    <ul>
                        {exercise.instructions?.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

ExercisePopUp.propTypes = {
    exercise: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        reps: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        sets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        days: PropTypes.arrayOf(PropTypes.string),
        dates: PropTypes.arrayOf(PropTypes.string),
        bodyPart: PropTypes.string,
        target: PropTypes.string,
        instructions: PropTypes.arrayOf(PropTypes.string),
        gif: PropTypes.string,
    }),
    isEditing: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default ExercisePopUp;
