import { useEffect, useState } from "react";
import PlanDropdown from "../../components/PlanDropdown";
import PublicPlanTable from "./components/PublicPlanTable";
import usePublicPlanServices from "../../services/usePublicPlanServices";
import useWorkoutPlans from "../../hooks/useWorkoutPlans";
import "./index.scss";

/**
 * Main page public plans and publishing, viewing, and downloading them.
 */
const PublicPlans = () => {
    const [selectedPlan, setSelectedPlan] = useState(-1);
    const [publicPlans, setPublicPlans] = useState([]);
    const { setWorkoutPlans } = useWorkoutPlans();
    const { fetchPublicPlans, addPublicPlan, ratePublicPlan, copyPublicPlan } = usePublicPlanServices();

    const fetchPlans = async () => {
        try {
            const response = await fetchPublicPlans();
            setPublicPlans(response);
        } catch (err) {
            console.error("Error fetching public plan:", err);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const publishPlan = async (plan) => {
        try {
            await addPublicPlan(plan);
            fetchPlans();
        } catch (err) {
            console.error("Error publishing plan:", err);
        }
    };

    const copyPlan = async (plan) => {
        try {
            const response = await copyPublicPlan(plan.id);
            const id = response.id;
            const name = plan.name;
            const description = plan.description;
            setWorkoutPlans(prevPlans => [...prevPlans, { id, name, description }]);
        } catch (err) {
            console.error("Error downloading plan:", err);
        }
    };

    const setRating = async (id, rating) => {
        try {
            const response = await ratePublicPlan(id, rating);
            const newId = response.id;
            setPublicPlans((prevPlans) =>
                prevPlans.map((plan) =>
                    plan.id === newId ? { ...plan, average_rating: rating, user_rating: rating } : plan
                )
            );
        } catch (err) {
            console.error("Error rating plan:", err);
        }
    };

    return (
        <>
            <div className="publish-plan testing-test">
                <PlanDropdown onSelect={(selected) => setSelectedPlan(selected)} selectedValue={selectedPlan} />
                <button className="publish-button" onClick={() => publishPlan(selectedPlan)}> Publish </button>
            </div>
            <PublicPlanTable workoutPlans={publicPlans} setRating={setRating} downloadPlan={copyPlan} />
        </>
    )
}

export default PublicPlans;