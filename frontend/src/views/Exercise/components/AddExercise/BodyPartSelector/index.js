import { useState, useEffect, useRef } from 'react';
import { axiosExerciseDB } from '../../../../../APIs/axios';
import BodyPartCard from './components/BodyPartCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const BodyPartSelector = ({selected, selectBodyPart}) => {
    const [bodyParts, setBodyParts] = useState([]);
    const listRef = useRef(null);

    useEffect(() => {
        async function fetchBodyParts() {
            try {
                const response = await axiosExerciseDB.get('/exercises/bodyPartList');
                setBodyParts(response.data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        }

        fetchBodyParts();
    }, []);

    const scrollLeft = () => {
        if (listRef.current) {
            const scrollAmount = (listRef.current.clientWidth / 3) + (2 * 1 /* gap */);
            listRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };
    
    const scrollRight = () => {
        if (listRef.current) {
            const scrollAmount = (listRef.current.clientWidth / 3) + (2 * 1 /* gap */);
            listRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    

    return (
        <div className="bodyPartSelector">
            <div className="scrollButton left" onClick={scrollLeft}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="bodyPartList" ref={listRef}> {/*maybe replace with react-horizonal-scroll-menu*/}
                {bodyParts.map((bodyPart, index) => (
                    <BodyPartCard
                        key={index}
                        bodyPart={bodyPart}
                        onClick={(bodyPart) => selectBodyPart(selected === bodyPart ? null : bodyPart)}
                        isSelected={selected === bodyPart}
                    />
                ))}
            </div>
            <div className="scrollButton right" onClick={scrollRight}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    );
}

export default BodyPartSelector;
