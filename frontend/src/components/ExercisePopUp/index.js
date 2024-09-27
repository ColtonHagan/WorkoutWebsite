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

/**
 * Component to handle the Exercise Pop-Up form.
 * 
 * This component allows users to add or edit exercise information,
 * It also fetches a nickname for the exercise if necessary and handles form submissions.
 *
 * @param {Object} exercise - The exercise object containing details to be edited or added.
 * @param {boolean} [isEditing=true] - A flag indicating if the component is in edit mode.
 * @param {Function} onClose - Gunction to close the pop-up.
 * @param {Function} onSubmit - Function to submit/update the exercise data.
 */
const ExercisePopUp = ({ exercise, isEditing = true, onClose, onSubmit }) => {
    const { getNickname } = useChatGPTService();

    const [nickName, setNickName] = useState('');
    const [days, setDays] = useState(
        isEditing ? exercise.days.map(day => ({ value: day, label: day })) : []
    );
    const [dates, setDates] = useState(
        isEditing ? (exercise.dates ? exercise.dates.map(date => new Date(date)) : []) : []
    );
    const [reps, setReps] = useState(isEditing ? exercise.reps : 0);
    const [sets, setSets] = useState(isEditing ? exercise.sets : 0);
    const [weight, setWeight] = useState(isEditing ? exercise.weight : 0);
    const [errorMessage, setErrorMessage] = useState('');

    const initialValues = {
        days: isEditing ? [...exercise.days] : [],
        dates: isEditing ? [...exercise.dates] : [],
        reps: isEditing ? exercise.reps : 0,
        sets: isEditing ? exercise.sets : 0,
        weight: isEditing ? exercise.weight : 0
    };

    const gif = useMemo(() => (
        isEditing ? exercise?.gif : `https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/${exercise.id}`
    ), [exercise.id, isEditing]);

    /**
     * Fetches a nickname for the given exercise name using the ChatGPT service.
     * 
     * @param {string} exerciseName - The name of the exercise for which to fetch the nickname.
     */
    const fetchNickname = async (exerciseName) => {
        try {
            const response = await getNickname(exerciseName);
            const nickname = response.choices[0].message.content;
            return nickname;
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

    /**
     * Determines whether any changes have been made to the exercise form.
     * 
     * @returns {boolean} - True if there are changes; otherwise false.
     */
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

    /**
     * Handles changes to numeric input fields by parsing and setting the value.
     * 
     * @param {Event} e - The input change event.
     * @param {Function} setter - The setter function to update the state.
     */
    const handleNumberInputChange = (e, setter) => {
        const value = e.target.value;
        setter(value === '' || isNaN(value) ? 0 : parseInt(value, 10));
    };

    /**
     * Handles changes to the weight input field specifically.
     * 
     * @param {Event} e - The input change event.
     */
    const handleWeightInputChange = (e) => {
        const value = e.target.value;
        setWeight(value === '' || isNaN(value) ? 0 : parseFloat(value));
    };

    /**
     * Handles the form submission by preparing the payload and calling onSubmit.
     */
    const handleSubmit = async () => {
        setErrorMessage('');

        // Check if both days and dates are empty
        if (days.length === 0 && dates.length === 0) {
            setErrorMessage('Please select a date/day for exercise'); // Set error message
            return;
        }

        try {
            let payload = {};
            if (isEditing) {
                payload = { reps, sets, weight, dates, days: days.map(day => day.value) }
            } else {
                payload = {
                    name: CapitalizeWords(exercise.name),
                    nickname: nickName,
                    gif,
                    reps,
                    sets,
                    dates: dates,
                    instructions: exercise?.instructions,
                    weight,
                    days: days.map(day => day.value),
                    body_part: CapitalizeWords(exercise.bodyPart),
                    target: CapitalizeWords(exercise.target)
                };
            }
            onSubmit(payload);
            onClose();
        } catch (error) {
            console.error('Error saving exercise:', error);
        }
    };

    return (
        <div className="exercise-pop-up-container big-pop-up">
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
                                    min='0' />
                            </li>
                            <li><label htmlFor='sets'>Sets:</label>
                                <input
                                    type='number'
                                    value={sets}
                                    onChange={(e) => handleNumberInputChange(e, setSets)}
                                    min='0' />
                            </li>
                            <li>
                                <label htmlFor='weight'>Weight:</label>
                                <input
                                    type='number'
                                    value={weight}
                                    onChange={handleWeightInputChange}
                                    min='0'
                                    step='2.5' />
                            </li>
                            <li>
                                <label htmlFor='days'>Days:</label>
                                <Select
                                    options={dayOptions}
                                    isMulti
                                    value={days}
                                    className='react-select'
                                    onChange={(e) => setDays(e)}
                                    placeholder="Select Days" />
                            </li>
                            <li>
                                <label htmlFor='dates'>Dates: </label>
                                <MultiDatePicker
                                    value={dates}
                                    onChange={(newDates) => {
                                        //This should be own function
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
                                    placeholder="Select Dates" />
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
        reps: PropTypes.number,
        sets: PropTypes.number,
        weight: PropTypes.number,
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
