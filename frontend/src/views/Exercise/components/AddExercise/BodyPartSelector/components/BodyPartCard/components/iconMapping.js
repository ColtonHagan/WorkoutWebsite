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
    Other: <FaDumbbell />,
};

export default iconMapping;
