import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { axiosExerciseDB } from '../../../../../APIs/axios';
import BodyPartCard from './components/BodyPartCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';

const BodyPartSelector = ({ selected, selectBodyPart }) => {
    const [bodyParts, setBodyParts] = useState([]);
    const sliderRef = useRef(null);

    const tempExercises = [ // temp data
        "back", "cardio", "chest", "lower arms", "lower legs",
        "neck", "shoulders", "upper Arms", "upper Legs", "waist"
    ];

    useEffect(() => {
        /*async function fetchBodyParts() {
            try {
                const response = await axiosExerciseDB.get('/exercises/bodyPartList');
                setBodyParts(response.data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        }

        fetchBodyParts();*/

        setBodyParts(tempExercises); // Use temp data for now
    }, []);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <div style={{ display: 'none' }} />, // Hide default arrows
        prevArrow: <div style={{ display: 'none' }} />,
        autoplay: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="bodyPartSelector">
            <div className="scrollButton left" onClick={() => sliderRef.current.slickPrev()}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <>
            <Slider ref={sliderRef} {...settings}>
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
            <div className="scrollButton right" onClick={() => sliderRef.current.slickNext()}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    );
};

export default BodyPartSelector;
