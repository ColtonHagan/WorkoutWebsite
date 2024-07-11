import React, { useState, useEffect, useContext } from 'react';
import axiosExerciseDB from 'axios';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import BodyPartCard from './components/BodyPartCard';
import './index.scss';

const BodyPartSelectorBad = () => {
    const [bodyParts, setBodyParts] = useState([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState(null);

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

    const Arrow = ({ direction, disabled, onClick }) => {
        const visibility = useContext(VisibilityContext);
        const isLeft = direction === 'left';

        const isVisible = isLeft
            ? visibility.useIsVisible('first', true)
            : visibility.useIsVisible('last', false);

        return (
            <div
                className={`arrow ${direction} ${disabled ? 'disabled' : ''}`}
                onClick={disabled ? null : onClick}
            >
                {isLeft ? 'Left' : 'Right'}
            </div>
        );
    };

    const handleSelectBodyPart = (bodyPart) => {
        setSelectedBodyPart(bodyPart);
    };

    const renderBodyPartCards = () =>
        bodyParts.map((part) => (
            <BodyPartCard
                key={part.id}
                bodyPart={part.name}
                isSelected={selectedBodyPart === part.name}
                onClick={handleSelectBodyPart}
            />
        ));

    return (
        <div className="bodyPartSelector">
            <ScrollMenu
                data={renderBodyPartCards()}
                arrowLeft={<Arrow direction="left" />}
                arrowRight={<Arrow direction="right" />}
                wheel={false}
                itemClass="bodyPartCardWrapper"
                scrollToSelected={true}
                selected={selectedBodyPart}
                onSelect={(key) => handleSelectBodyPart(key)}
            />
        </div>
    );
};

export default BodyPartSelectorBad;
