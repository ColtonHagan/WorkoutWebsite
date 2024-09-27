import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import BodyPartSelector from './BodyPartSelector';
import ExerciseList from './ExerciseList';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa6';
import useExternalExercisesServices from '../../../../services/useExternalExercisesServices';
import Error from '../../../../components/Error'
import "./index.scss";;

/**
 * Component to add exercises with filtering capabilities.
 *
 * @param {function} addExercise - Function to add an exercise.
 */
const AddExercise = ({ addExercise }) => {
    const [exercises, setExercises] = useState([]);
    const [bodyParts, setBodyParts] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedBodyPart, setSelectedBodyPart] = useState();
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { fetchExercises, fetchBodyParts } = useExternalExercisesServices();

    /**
     * Since dataset is large and static I am fetching everything and then filtering
     * rather then using the built in pagination. This also limits the api calls
     * as I am using the free vesion with a limit.
     */
    useEffect(() => { 
        const limit = 1600; // needs 1600+ to overwrite base limit 10
        const offset = 0;
        async function getExercises() {
            try {
                const response = await fetchExercises(limit, offset);
                setExercises(response);
            } catch (error) {
                console.error('Error fetching exercises:', error);
                setError(true);
            }
        }

        getExercises();
    }, []);

    useEffect(() => {
        async function getBodyParts() {
            try {
                const response = await fetchBodyParts();
                setBodyParts(response);
            } catch (error) {
                console.error('Error fetching exercises:', error);
                setError(true);
            }
        }

        getBodyParts();
    }, []);

    // Filter exercises based on selected body part and search query
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

    // Toggle body part dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='add-exercise-container'>
            {error ? (
                <Error message="Unable to connect to external exercise API." />
            ) : (
                <>
                    <div className="search-container">
                        <button onClick={toggleDropdown} className="body-part-button {isDropdownOpen ? 'open' : ''}">
                            {isDropdownOpen ? <FaCaretDown /> : <FaCaretRight />}
                        </button>
                        {!error && <SearchBar onSearch={handleSearch} />}
                    </div>
                    {isDropdownOpen && (
                        <BodyPartSelector
                            selected={selectedBodyPart}
                            selectBodyPart={setSelectedBodyPart}
                            bodyParts={bodyParts}
                        />
                    )}
                    <ExerciseList
                        exercises={filteredExercises}
                        addExercise={addExercise}
                    />
                </>
            )}
        </div>
    );
}

// PropTypes validation
AddExercise.propTypes = {
    addExercise: PropTypes.func.isRequired,
};

export default AddExercise;