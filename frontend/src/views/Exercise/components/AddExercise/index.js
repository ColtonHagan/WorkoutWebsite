import { useEffect, useState } from 'react';
import { axiosExerciseDB } from '../../../../APIs/axios';
import "./index.scss";

const AddExercise = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const limit = 10; //needs 1500+ to overwrite base limit 10
        const offset = 0; //not need yet
        async function fetchExercises() {
            try {
                const response = await axiosExerciseDB.get(`/exercises?limit=${limit}&offset=${offset}`);
                setExercises(response.data);
                console.log()
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        }

        fetchExercises();
    }, []);

    return (
        <div className="testing">
            {/* Search Bar */}
            {/* Body Part Selector */}
            {/* List of Exercises */}

            <h1>Exercise List</h1>
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise.id}>{exercise.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default AddExercise