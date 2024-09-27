import PropTypes from 'prop-types';
import { TbError404Off } from 'react-icons/tb';
import './index.scss';

/**
 * Error component to display an error message & icon.
 *
 * @param {string} message - The error message to display.
 */
const Error = ({ message = 'An unexpected error has occurred.' }) => {
    return (
        <div className="error-container" role="alert">
            <TbError404Off className="error-icon" aria-hidden="true" />
            <h1 className="error-title">Oops!</h1>
            <p className="error-message">
                {message} <br />
                If the problem persists, reach out via email at <a href="mailto:coltonmhagan@gmail.com">coltonmhagan@gmail.com</a>.
            </p>
        </div>
    );
};

// PropTypes valclassNameation
Error.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Error;