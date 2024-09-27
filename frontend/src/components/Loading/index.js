import './index.scss';

/**
 * Loading component that displays a spinner and message.
 *
 */
const Loading = () => {
    return (
        <div className="spinner-container" role="alert" aria-live="polite">
            <div className="spinner" aria-hidden="true"> </div>
            <p className="spinner-message">Loading...</p>
        </div>
    );
};

export default Loading;
