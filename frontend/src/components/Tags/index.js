import PropTypes from 'prop-types';
import { CapitalizeWords } from '../../util/CapitalizeWords';
import './index.scss';

/**
 * Tags component contains two text tags based on the body part and target muscle.
 *
 * @param {string} bodyPart - The name of the body part to display.
 * @param {string} target - The target muscle group to display.
 */
const Tags = ({bodyPart, target}) => {
    return (
        <div className='tags'>
            <p>{CapitalizeWords(bodyPart)}</p>
            <p>{CapitalizeWords(target)}</p>
        </div>
    )
}

// PropTypes validation
Tags.propTypes = {
    bodyPart: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired
};

export default Tags;