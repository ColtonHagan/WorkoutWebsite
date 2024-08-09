import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MultiDatePicker from 'react-multi-date-picker';
import Select from 'react-select';
import "./index.scss";

const AddExercisePopUp = ({ exercise, onClose, addExercise }) => {
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    const [weight, setWeight] = useState(0);
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    const handleSave = async () => {
        const payload = {
            name: exercise.name,
            external_workout_id: exercise.id,
            reps,
            sets,
            dates: selectedDates,
            weight,
            days: selectedDays,
            body_part: exercise.bodyPart,
            target_muscle: exercise.target
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
