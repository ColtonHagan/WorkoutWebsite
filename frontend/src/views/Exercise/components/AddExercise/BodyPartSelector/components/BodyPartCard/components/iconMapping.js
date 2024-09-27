import {
    GiAbdominalArmor,
    GiChestArmor,
    GiArmorPunch,
    GiLegArmor,
    GiNecklaceDisplay,
    GiShoulderArmor,
    GiBiceps,
    GiArmoredPants,
    GiSpineArrow
} from 'react-icons/gi';
import { FaRunning, FaDumbbell } from 'react-icons/fa';

/**
 * A mapping between exercise body parts and corresponding icons.
 * Used to dynamically render icons based on the body part.
 */
const iconMapping = {
    back: <GiSpineArrow />,
    cardio: <FaRunning />,
    chest: <GiChestArmor />,
    'lower arms': <GiArmorPunch />,
    'lower legs': <GiLegArmor />,
    neck: <GiNecklaceDisplay />,
    shoulders: <GiShoulderArmor />,
    'upper arms': <GiBiceps />,
    'upper legs': <GiArmoredPants />,
    waist: <GiAbdominalArmor />,
    other: <FaDumbbell />, // Fallback Icon
};

export default iconMapping;
