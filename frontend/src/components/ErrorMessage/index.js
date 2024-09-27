import PropTypes from 'prop-types';
import "./index.scss";

/**
 * ErrorMessage component to display validation errors in the form.
 * 
 * @param {string} message - The error message to be displayed.
 */
const ErrorMessage = ({ message = "Unspecified error" }) => {
    if (!message) return null;
    return <span className="error-message">{message}</span>;
};

// PropTypes for type checking
ErrorMessage.propTypes = {
    message: PropTypes.string,
};

export default ErrorMessage;
