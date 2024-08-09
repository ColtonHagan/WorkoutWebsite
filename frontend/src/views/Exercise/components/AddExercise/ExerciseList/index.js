import { useState } from 'react'
import AddExerciseCard from './components/AddExerciseCard'
import AddExercisePopUp from './components/AddExercisePopUp';
import Paginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./index.scss";

const ExerciseList = ({ exercises, addExercise}) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  const exercisesPerPage = 9;
  const pagesVisited = pageNumber * exercisesPerPage;
  const displayExercises = exercises.slice(pagesVisited, pagesVisited + exercisesPerPage);
  const pageCount = Math.ceil(exercises.length / exercisesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className='addExerciseContainer'>
      <h3>Exercises</h3>
      <div className='exerciseList'>
        {displayExercises.map(exercise => (
          <AddExerciseCard key={exercise.id} exercise={exercise} onClick={() => setSelectedExercise(exercise)} />
        ))}
      </div>
      <Paginate
        previousLabel={<FontAwesomeIcon className="icon-custom" icon={faChevronLeft} />}
        nextLabel={<FontAwesomeIcon className="icon-custom" icon={faChevronRight} />}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="pagination"
        previousClassName="pagination__arrow"
        nextClassName="pagination__arrow"
        disabledClassName="pagination__link--disabled"
        activeClassName="pagination__link--active"
        pageClassName="pagination__link"
      />
      {selectedExercise && (
        <AddExercisePopUp
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          addExercise={(exercise) => addExercise(exercise)}
        />
      )}
    </div>
  )
}

export default ExerciseList