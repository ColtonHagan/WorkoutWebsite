import { useState, useEffect } from 'react';
import Select from 'react-select';
import MultiDatePicker from 'react-multi-date-picker';
import { axiosExerciseDB } from '../../APIs/axios';
import './index.scss';
import axios from 'axios';
import { CapitalizeWords } from '../../util/CapitalizeWords';

const ExercisePopUp = ({ exercise, isEditing = true, onClose, onSubmit }) => {
    const [exerciseInfo, setExerciseInfo] = useState( isEditing ? {} : exercise ); //split into seperate consts for each use
    const [days, setDays] = useState(
        isEditing ? exercise.days.map(day => ({ value: day, label: day })) : []
    );
    const [dates, setDates] = useState(
        isEditing ? (exercise.dates ? exercise.dates.map(date => new Date(date)) : []) : []
    );
    const [reps, setReps] = useState(isEditing ? exercise.reps : 0); //need to convert from string to int
    const [sets, setSets] = useState(isEditing ? exercise.sets : 0);
    const [weight, setWeight] = useState(isEditing ? exercise.weight : 0);
    const initialValues = {
        days: isEditing ? [...exercise.days] : [],
        dates: isEditing ? [...exercise.dates] : [],
        reps: isEditing ? exercise.reps : 0,
        sets: isEditing ? exercise.sets : 0,
        weight: isEditing ? exercise.weight : 0
    };

    const dayOptions = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ].map(day => ({ value: day, label: day }));

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


    //move into util file
    const removeTrailingPeriodAndTrim = (text) => {
        if (typeof text !== 'string') return '';

        let result = text.trim();
        if (result.endsWith('.')) {
            result = result.slice(0, -1);
        }
        return result;
    }

    //this should be moved into its own api file
    const getNickname = async (exerciseName) => {
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `Just return your response, no explanation. Remove Provide shortest functional name for "${exerciseName}". Remove filler words like barbell or dumbbell. Limit 3 words (but use less if possible).`
                    }
                ],
                max_tokens: 10
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_CHATGPT_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            const nickname = response.data.choices[0].message.content.trim();
            return nickname;
        } catch (error) {
            console.error("Error fetching nickname from ChatGPT:", error);
            return null;
        }
    };

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                console.log("Updating ", exercise.name);
            } else {
                console.log("days", days.map(day => day.value));
                const payload = {
                    name: CapitalizeWords(exercise.name),
                    nickname: CapitalizeWords(removeTrailingPeriodAndTrim(exercise.name.length > 15 ? await getNickname(exercise.name) : exercise.name)),
                    external_workout_id: exercise.id,
                    reps,
                    sets,
                    dates: dates,
                    weight,
                    days: days.map(day => day.value),
                    body_part: CapitalizeWords(exercise.bodyPart),
                    target: CapitalizeWords(exercise.target)
                };
                onSubmit(payload);
                onClose();
            }
            onClose();
        } catch (error) {
            console.error('Error saving exercise:', error);
        }
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

        isEditing && fetchExercises();
    }, [exercise.external_workout_id]);

    return (
        <div id="exercise-pop-up-container">
            <div className='pop-up-header'>
                <h1 className='ellipsis'>{CapitalizeWords(exercise.name)}</h1>
            </div>
            <div className='pop-up-content'>
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
                                    min='0' />
                            </li>
                            <li><label htmlFor='sets'>Sets:</label>
                                <input
                                    type='number'
                                    value={sets}
                                    onChange={(e) => setSets(parseInt(e.target.value))}
                                    min='0' />
                            </li>
                            <li>
                                <label htmlFor='weight'>Weight:</label>
                                <input
                                    type='number'
                                    value={weight}
                                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                                    min='0'
                                    step='2.5' />
                            </li>
                            <li>
                                <label htmlFor='days'>Days:</label>
                                <Select
                                    options={dayOptions}
                                    isMulti
                                    value={days}
                                    onChange={(e) => setDays(e)}
                                    placeholder="Select Days" />
                            </li>
                            <li>
                                <label htmlFor='dates'>Dates: </label>
                                <MultiDatePicker
                                    value={dates}
                                    onChange={(newDates) => {
                                        if (newDates.isValid) return;

                                        const dateObjects = newDates
                                            .map(date => new Date(date))
                                            .filter(date => !isNaN(date));

                                        setDates(dateObjects);
                                    }}
                                    placeholder="Select Dates" />
                            </li>
                            <div id='update-container'>
                                <button
                                    className={`update-button ${hasChanges() ? 'active' : 'disabled'}`}
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
                        {exerciseInfo.instructions?.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ExercisePopUp;
