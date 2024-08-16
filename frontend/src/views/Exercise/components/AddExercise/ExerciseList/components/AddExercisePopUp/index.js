import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MultiDatePicker from 'react-multi-date-picker';
import Select from 'react-select';
import { CapitalizeWords } from '../../../../../../../util/CapitalizeWords';
import "./index.scss";
import axios from 'axios';

const AddExercisePopUp = ({ exercise, onClose, addExercise }) => {
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    const [weight, setWeight] = useState(0);
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    //helps with some 
    const removeTrailingPeriodAndTrim = (text) => {
        if (typeof text !== 'string') return '';

        let result = text.trim(); // Remove leading and trailing whitespace
        if (result.endsWith('.')) {
            result = result.slice(0, -1); // Remove the trailing period
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

    const handleSave = async () => {
        const payload = {
            name: CapitalizeWords(exercise.name),
            nickname: CapitalizeWords(removeTrailingPeriodAndTrim(exercise.name.length > 15 ? await getNickname(exercise.name) : exercise.name)),
            external_workout_id: exercise.id,
            reps,
            sets,
            dates: selectedDates,
            weight,
            days: selectedDays,
            body_part: CapitalizeWords(exercise.bodyPart),
            target_muscle: CapitalizeWords(exercise.target)
        };
        console.log(payload);
        await addExercise(payload);
        onClose();
    };

    const handleDateChange = (dates) => {
        const formattedDates = dates.map(date => date.format("YYYY/MM/DD"));
        setSelectedDates(formattedDates);
    };

    const handleDayChange = (selectedOptions) => {
        const days = selectedOptions.map(option => option.value);
        setSelectedDays(days);
    };

    const dayOptions = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ].map(day => ({ value: day, label: day }));

    return ReactDOM.createPortal(
        <>
            <div className='popup-overlay' />
            <div className='pop-up'>
                <h1>{exercise.name} {exercise.id}</h1>
                <form className='exercise-form'>
                    <div className='form-group'>
                        <label>Reps</label>
                        <input
                            type='number'
                            value={reps}
                            onChange={(e) => setReps(parseInt(e.target.value))}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Sets</label>
                        <input
                            type='number'
                            value={sets}
                            onChange={(e) => setSets(parseInt(e.target.value))}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Weight</label>
                        <input
                            type='number'
                            step='0.5'
                            value={weight}
                            onChange={(e) => setWeight(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Dates</label>
                        <MultiDatePicker
                            value={selectedDates}
                            onChange={handleDateChange}
                            placeholder="Select Dates"
                            className='.react-datepicker-wrapper'
                        />
                    </div>
                    <div className='form-group'>
                        <label>Day Selector</label>
                        <Select
                            onChange={handleDayChange}
                            options={dayOptions}
                            isMulti
                            className='react-select__control'
                        />
                    </div>
                </form>
                <div className='buttons'>
                    <button className='save-btn' onClick={handleSave}>
                        Save
                    </button>
                    <button className='close-btn' onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default AddExercisePopUp;
