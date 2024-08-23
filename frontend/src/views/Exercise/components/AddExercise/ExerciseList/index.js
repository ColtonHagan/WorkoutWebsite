import { useState } from 'react'
import AddExerciseCard from './components/AddExerciseCard'
import Paginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PopUpContainer from '../../../../../components/PopUpContainer';
import ExercisePopUp from '../../../../ExercisePopUp';
import "./index.scss";

const ExerciseList = ({ exercises, addExercise }) => {
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
      <div className='exerciseList'>
        {displayExercises.map(exercise => (
          <AddExerciseCard key={exercise.id} exercise={exercise} onClick={() => setSelectedExercise(exercise)} />
        ))}
      </div>
      {exercises.length > exercisesPerPage && <Paginate
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
      />}
      <PopUpContainer display={selectedExercise} onClose={() => setSelectedExercise(null)}>
        <ExercisePopUp exercise={selectedExercise} isEditing={false} onClose={() => setSelectedExercise(null)} onSubmit={addExercise}/>
      </PopUpContainer>
    </div>
  )
}

export default ExerciseList