import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Select from "react-select";
import CustomSingleValue from "./Components/CustomSingleValue";
import useWorkoutPlans from "../../hooks/useWorkoutPlans";
import DropDownPopUp from "./Components/DropDownPopUp";
import PopUpContainer from "../PopUpContainer";
import useWorkoutPlanService from "../../services/useWorkoutPlanServices";
import useWorkoutService from "../../services/useWorkoutService";
import useWorkouts from "../../hooks/useWorkouts";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./index.scss";

/**
 * Dropdown component for selecting and managing workout plans.
 *
 * @param {function} onSelect - function to handle selection change.
 * @param {number} selectedValue - Currently selected workout plan id.
 * 
 */
const PlanDropdown = ({ onSelect, selectedValue }) => {
    const { workoutPlans, setWorkoutPlans } = useWorkoutPlans();
    const [ selectedPlan, setSelectedPlan ] = useState(null);
    const { setWorkouts } = useWorkouts();
    const { fetchWorkouts } = useWorkoutService();
    const { deletePlan, editPlan } = useWorkoutPlanService();
    const [ currentPlan, setCurrentPlan] = useLocalStorage('selectedPlan', selectedValue);

    // Format options for the select component
    const formattedOptions = workoutPlans?.map((plan) => ({
        value: plan.id,
        label: plan.name,
    }));

    useEffect(() => {
        if (workoutPlans.length > 0 && selectedValue < 0) {
            if(currentPlan && currentPlan >= 0) handleChange({value: currentPlan});
            else handleChange(formattedOptions[0]);
        }
    }, [formattedOptions, workoutPlans, selectedValue]);

    /**
     * Handles when a workout plan is selected.
     *
     * @param {Object} selectedOption - The selected option from the dropdown.
     */
    const handleChange = async (selectedOption) => {
        const fetchWorkoutData = async () => {
            try {
                const response = await fetchWorkouts(selectedOption.value);
                setWorkouts(response);
            } catch (err) {
                console.error("Error changing plan", err);
            }
        };
        await fetchWorkoutData(workoutPlans[0].id);
        setCurrentPlan(selectedOption.value);
        onSelect(selectedOption.value);
    };

    const handleEditClick = (value) => {
        setSelectedPlan(workoutPlans?.find(plan => plan?.id === value));
    };

    /**
     * Removes a workout plan and updates the state.
     *
     * @param {number} id - The ID of the workout plan to remove.
     */
    const removePlan = async (id) => {
        try {
            const result = await deletePlan(id);
            const deletedId = result.id;
            setWorkoutPlans(prevPlans => prevPlans.filter(plan => plan.id !== deletedId));
            const firstValidOption = formattedOptions?.find(option => option.value !== deletedId);
            firstValidOption && handleChange(firstValidOption.value);
        } catch (err) {
            console.error("Error deleting plan:", err);
        }
    };

    /**
     * Edits a workout plan and updates the state.
     *
     * @param {string} name - The new name of the workout plan.
     * @param {string} description - The new description of the workout plan.
     */
    const handleEdit = async (name, description) => {
        try {
            const result = await editPlan(selectedPlan.id, { name, description });
            const newId = result.id;
            setWorkoutPlans(prevPlans => prevPlans.map(plan => plan.id === newId ? { ...plan, name, description } : plan));
        } catch (err) {
            console.error("Error editing plan:", err);
        }
    }

    return (
        <div className="dropdown-container">
            <Select
                id={workoutPlans.length}
                className="dropdown"
                options={formattedOptions}
                placeholder="Create a workout plan"
                value={formattedOptions.find(option => option.value === selectedValue)}
                components={{
                    SingleValue: (props) => (
                        <CustomSingleValue {...props} onEditClick={handleEditClick} formattedOptions={formattedOptions} />
                    )
                }}
                onChange={handleChange}
            />
            <PopUpContainer display={selectedPlan} onClose={() => setSelectedPlan(null)} size = "small">
                <DropDownPopUp
                    plan={selectedPlan}
                    onClose={() => setSelectedPlan(null)}
                    deletePlan={removePlan}
                    handleSave={handleEdit}
                    isEditing={true}
                />
            </PopUpContainer>
        </div>
    );
};

// PropTypes validation
PlanDropdown.propTypes = {
    onSelect: PropTypes.func.isRequired,
    selectedValue: PropTypes.number.isRequired
};

export default PlanDropdown;