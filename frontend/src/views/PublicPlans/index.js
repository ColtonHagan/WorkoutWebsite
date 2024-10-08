import { useEffect, useState } from "react";
import PlanDropdown from "../../components/PlanDropdown";
import "./index.scss";
import PublicPlanTable from "./components/PublicPlanTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PublicPlans = () => {
    const [selectedPlan, setSelectedPlan] = useState();
    const [publicPlans, setPublicPlans] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const fetchPlans = async () => {
        try {
            const response = await axiosPrivate.get("publicPlans/");
            setPublicPlans(response.data);
            console.log("public plans", response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const publishPlan = async (plan) => {
        try {
            console.log(plan);
            await axiosPrivate.post("publicPlans/", { plan_id: plan });
            fetchPlans();
            console.log("Plan added:", { plan });
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div>
            <div id="publish-plan">
                <PlanDropdown onSelect={(selected) => setSelectedPlan(selected)} selectedValue={selectedPlan} />
                <button id="publish-button" onClick={() => publishPlan(selectedPlan)}> Publish </button>
            </div>
            <PublicPlanTable workoutPlans={publicPlans} setWorkoutPlans={setPublicPlans}/>
        </div>
    )
}

export default PublicPlans;