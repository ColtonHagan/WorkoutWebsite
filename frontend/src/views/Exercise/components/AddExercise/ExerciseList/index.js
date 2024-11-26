import { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types';
import AddExerciseCard from './components/AddExerciseCard'
import PopUpContainer from '../../../../../components/PopUpContainer';
import ExercisePopUp from '../../../../../components/ExercisePopUp';
import CustomPaginate from '../../../../../components/CustomPaginate';
import useWindowDimensions from '../../../../../hooks/useWindowDimensions';
import "./index.scss";

/**
 * ExerciseList component displays a list of exercises with pagination
 * and a popup to add selected exercises.
 *
 * @param {Object} exercises - List of exercise objects.
 * @param {Function} addExercise - Function to add selected exercise.
 */
const ExerciseList = ({ exercises, addExercise, searchQuery, selectedBodyPart }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const { width } = useWindowDimensions();

  // Reset to first page when search or body part filter changes
  useEffect(() => {
    setPageNumber(0);
  }, [searchQuery, selectedBodyPart]);

  // Calculates the number of exercises per page based on window width
  const exercisesPerPage = useMemo(() => {
    if (width > 1250) return 9;  // Desktop
    if (width > 600) return 6;   // Tablet
    return 4;                    // Mobile
  }, [width]);

  const pagesVisited = useMemo(() => pageNumber * exercisesPerPage, [pageNumber, exercisesPerPage]);
  const displayExercises = useMemo(() => exercises.slice(pagesVisited, pagesVisited + exercisesPerPage), [exercises, pagesVisited, exercisesPerPage]);
  const pageCount = useMemo(() => Math.ceil(exercises.length / exercisesPerPage), [exercises, exercisesPerPage]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className='addExerciseContainer'>
      <div className='exerciseList'>
        {displayExercises.map(exercise => (
          <AddExerciseCard key={exercise.id} exercise={exercise} onClick={() => setSelectedExercise(exercise)} />
        ))}
      </div>
      {exercises.length > exercisesPerPage && <CustomPaginate pageCount={pageCount} changePage={changePage} currentPage={pageNumber}/>}
      <PopUpContainer display={selectedExercise}  onClose={() => setSelectedExercise(null)} size="large">
        <ExercisePopUp exercise={selectedExercise} isEditing={false} onClose={() => setSelectedExercise(null)} onSubmit={addExercise} />
      </PopUpContainer>
    </div>
  )
}

// PropTypes validation
ExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  addExercise: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  selectedBodyPart: PropTypes.string,
};

export default ExerciseList