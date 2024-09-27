import { useRef } from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BodyPartCard from './components/BodyPartCard';
import Slider from 'react-slick'; //    
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';

/**
 * Component that allows users to select body parts using a slider.
 * 
 * @param {Object} selected - The currently selected body part
 * @param {function} selectBodyPart - Function to handle body part selection.
 * @param {Array<string>} bodyParts - List of body parts to display.
 */
const BodyPartSelector = ({ selected, selectBodyPart, bodyParts }) => {
    const sliderRef = useRef(null);

    // Slider Settings
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 500, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="bodyPartSelector">
            <div className="scrollButton left" onClick={() => sliderRef.current.slickPrev()} aria-label="Previous body part">
                {bodyParts.length > 0 && <FaChevronLeft />}
            </div>
            <>
                <Slider id="menu-slider" ref={sliderRef} {...settings}>
                    {bodyParts.map((bodyPart, index) => (
                        <div key={index}>
                            <BodyPartCard
                                bodyPart={bodyPart}
                                onClick={() => selectBodyPart(selected === bodyPart ? null : bodyPart)}
                                isSelected={selected === bodyPart}
                            />
                        </div>
                    ))}
                </Slider>
            </>
            <div className="scrollButton right" onClick={() => sliderRef.current.slickNext()} aria-label="Next body part">
                {bodyParts.length > 0 && <FaChevronRight />}
            </div>
        </div>
    );
};

// PropTypes validation
BodyPartSelector.propTypes = {
    selected: PropTypes.string,
    selectBodyPart: PropTypes.func.isRequired,
    bodyParts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BodyPartSelector;
