import { useEffect, useState } from 'react';
import { axiosExerciseDB } from '../../../../APIs/axios';
import SearchBar from './SearchBar';
import BodyPartSelector from './BodyPartSelector';
import ExerciseList from './ExerciseList';
import "./index.scss";

const AddExercise = ({selectedPlan}) => {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => { /*Since dataset is large and static I am fetching everything and then filtering*/
        const limit = 12; //needs 1500+ to overwrite base limit 10
        const offset = 0; //not need yet
        async function fetchExercises() {
            try {
                const response = await axiosExerciseDB.get(`/exercises?limit=${limit}&offset=${offset}`);
                setExercises(response.data);
                setFilteredExercises(response.data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        }

        fetchExercises();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = exercises.filter(exercise =>
                (selectedBodyPart ? exercise.bodyPart === selectedBodyPart : true) &&
                (exercise.name.toLowerCase().includes(searchQuery) ||
                exercise.bodyPart.toLowerCase().includes(searchQuery) ||
                exercise.equipment.toLowerCase().includes(searchQuery) ||
                exercise.target.toLowerCase().includes(searchQuery))
            );
            setFilteredExercises(filtered);
        };

        applyFilters();
    }, [exercises, selectedBodyPart, searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query.trim().toLowerCase());
    };

    return (
        <div className="testing">
            <SearchBar onSearch={handleSearch}/>{/* Search Bar */}
            {setSelectedBodyPart && <h1>{selectedBodyPart}</h1>}
            <div className='BodyPartSelector'>
                <BodyPartSelector selected= {selectedBodyPart} selectBodyPart={(bodyPart) => setSelectedBodyPart(bodyPart)}/> {/* Body Part Selector */}
            </div>
            <ExerciseList exercises={filteredExercises}/> {/*add exercise list*/}
        </div>
    );
}

export default AddExercise