import PropTypes from 'prop-types';
import "./index.scss";
import Logo from '../../../../../../../assets/Logo.png'
import Tags from '../../../../../../../components/Tags';
import { FaCirclePlus } from 'react-icons/fa6';
import { CapitalizeWords } from '../../../../../../../util/CapitalizeWords';

/**
 * AddExerciseCard component displays an exercise with its details
 * and provides an action to add it.
 *
 * @param {Object} exercise - The exercise object containing details.
 * @param {Function} onClick - Callback function to handle click events.
 */
const AddExerciseCard = ({ exercise, onClick }) => {
  return (
    <div className='exercise' onClick={onClick}>
      <img src={exercise.gifUrl} alt={exercise.name} loading='lazy' onError={(e) => e.target.src = Logo}/>
      <Tags bodyPart={exercise.bodyPart} target={exercise.target}/>
      <h1 className='ellipsis'>{CapitalizeWords(exercise.name)}</h1> 
      <button className='add-exercise-button' aria-label={`Add ${exercise.name}`}>
        <FaCirclePlus />
      </button>
    </div>
  )
}

// Prop Types validation
AddExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    gifUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bodyPart: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddExerciseCard