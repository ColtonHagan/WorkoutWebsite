import { useState, useMemo } from "react";
import RatingStars from "react-rating-stars-component";
import ExercisePlanPopUp from "../ExercisePlanPopUp";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import CustomPaginate from "../../../../components/CustomPaginate";
import "./index.scss";

const PublicPlanTable = ({ workoutPlans, setWorkoutPlans }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;

  const axiosPrivate = useAxiosPrivate();

  const fetchExercises = async (planId) => {
    try {
      const response = await axiosPrivate.get(`workouts/${planId}/workout`);
      setSelectedExercise(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const setRating = async (id, rating) => {
    try {
      const response = await axiosPrivate.post(`publicPlans/rate`, { public_id: id, rating });
      console.log("new rating", response.data.id);
      const newId = response?.data?.id;
      setWorkoutPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === newId ? { ...plan, average_rating: rating, user_rating: rating } : plan
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const onSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  //maybe should be a memo
  const sortedPlans = [...workoutPlans].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  //maybe memmo
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPlans = sortedPlans.slice(startIndex, endIndex);
  console.log({ pageNumber, startIndex, endIndex, paginatedPlans });

  const updateRating = (id, newRating) => {
    setRating(id, newRating);
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="public-plan-table">
      <table>
        <thead>
          <tr>
            <th
              className={sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? 'ascending' : 'descending') : ''}
              onClick={() => onSort('name')}
            >
              Name
              <span className="sort-icon" />
            </th>
            <th
              className={sortConfig.key === 'description' ? (sortConfig.direction === 'ascending' ? 'ascending' : 'descending') : ''}
              onClick={() => onSort('description')}
            >
              Description
              <span className="sort-icon" />
            </th>
            <th
              className={sortConfig.key === 'average_rating' ? (sortConfig.direction === 'ascending' ? 'ascending' : 'descending') : ''}
              onClick={() => onSort('average_rating')}
            >
              Rating
              <span className="sort-icon" />
            </th>
            <th
              className={sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? 'ascending' : 'descending') : ''}
              onClick={() => onSort('date')}
            >
              Date Updated
              <span className="sort-icon" />
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedPlans.map((plan) => (
            <tr key={plan.id} onClick={() => {
              fetchExercises(plan.plan_id);
              setSelectedPlan(plan);
            }}>
              <td>{plan.name}</td>
              <td>{plan.description}</td>
              <td>
                <div id="star-container">
                  <div id="star-container" onClick={(e) => e.stopPropagation()}>
                    <RatingStars
                      count={5}
                      value={parseFloat(plan.user_rating || plan.average_rating)}
                      onChange={(newRating) => updateRating(plan.id, newRating)}
                      activeColor="#ffd700"
                      isHalf={true}
                    />
                  </div>
                </div>
              </td>
              <td>{new Date(plan.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {workoutPlans.length > itemsPerPage && <CustomPaginate
        pageCount={Math.ceil(sortedPlans.length / itemsPerPage)}
        changePage={changePage}
      />}
      <ExercisePlanPopUp plan={selectedPlan} exercises={selectedExercise} onClose={() => setSelectedExercise(null)} />
    </div>
  );
};

export default PublicPlanTable;
