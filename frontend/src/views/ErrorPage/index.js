import Error from '../../components/Error';
import './index.scss'

/**
 * ErrorPage component displays an error message to the user.
 */
const ErrorPage = () => {
    return (
        <div id='error-container'>
            <Error message="We encountered an unexpected issue. Please try again later." />
        </div>
    );
};

export default ErrorPage;