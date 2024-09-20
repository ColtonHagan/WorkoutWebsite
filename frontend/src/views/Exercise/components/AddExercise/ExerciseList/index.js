import { useState, useEffect } from 'react'
import AddExerciseCard from './components/AddExerciseCard'
import PopUpContainer from '../../../../../components/PopUpContainer';
import ExercisePopUp from '../../../../ExercisePopUp';
import "./index.scss";
import CustomPaginate from '../../../../../components/CustomPaginate';

const ExerciseList = ({ exercises, addExercise }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [width, setWidth] = useState(window.innerWidth); //This should be a seperate hook

  const getExercisesPerPage = () => {
    if (width > 1250) return 9;  // Desktop
    if (width > 600) return 6;   // Tablet
    return 4;                    // Mobile
  };

  const exercisesPerPage = getExercisesPerPage();
  const pagesVisited = pageNumber * exercisesPerPage;
  const displayExercises = exercises.slice(pagesVisited, pagesVisited + exercisesPerPage);
  const pageCount = Math.ceil(exercises.length / exercisesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => { //should be in seperate hook
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='addExerciseContainer'>
      <div className='exerciseList'>
        {displayExercises.map(exercise => (
          <AddExerciseCard key={exercise.id} exercise={exercise} onClick={() => setSelectedExercise(exercise)} />
        ))}
      </div>
      {exercises.length > exercisesPerPage && <CustomPaginate pageCount={pageCount} changePage={changePage}/>}
      <PopUpContainer display={selectedExercise}  onClose={() => setSelectedExercise(null)}>
        <ExercisePopUp exercise={selectedExercise} isEditing={false} onClose={() => setSelectedExercise(null)} onSubmit={addExercise} />
      </PopUpContainer>
    </div>
  )
}

export default ExerciseList