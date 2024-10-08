import { useEffect, useState } from 'react';
import { axiosExerciseDB } from '../../../../APIs/axios';
import SearchBar from './SearchBar';
import BodyPartSelector from './BodyPartSelector';
import ExerciseList from './ExerciseList';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa6';
import "./index.scss";

const tempExercises = [
  {
      bodyPart: "waist",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/0001",
      id: "0001",
      name: "3/4 sit-up",
      target: "abs",
      secondaryMuscles: ["hip flexors", "lower back"],
      instructions: [
          "Lie flat on your back with your knees bent and feet flat on the ground.",
          "Place your hands behind your head with your elbows pointing outwards.",
          "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
          "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
          "Repeat for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "waist",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/0002",
      id: "0002",
      name: "45° side bend",
      target: "abs",
      secondaryMuscles: ["obliques"],
      instructions: [
          "Stand with your feet shoulder-width apart and your arms extended straight down by your sides.",
          "Keeping your back straight and your core engaged, slowly bend your torso to one side, lowering your hand towards your knee.",
          "Pause for a moment at the bottom, then slowly return to the starting position.",
          "Repeat on the other side.",
          "Continue alternating sides for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "waist",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/0003",
      id: "0003",
      name: "air bike",
      target: "abs",
      secondaryMuscles: ["hip flexors"],
      instructions: [
          "Lie flat on your back with your hands placed behind your head.",
          "Lift your legs off the ground and bend your knees at a 90-degree angle.",
          "Bring your right elbow towards your left knee while simultaneously straightening your right leg.",
          "Return to the starting position and repeat the movement on the opposite side, bringing your left elbow towards your right knee while straightening your left leg.",
          "Continue alternating sides in a pedaling motion for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "upper legs",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/1512",
      id: "1512",
      name: "all fours squad stretch",
      target: "quads",
      secondaryMuscles: ["hamstrings", "glutes"],
      instructions: [
          "Start on all fours with your hands directly under your shoulders and your knees directly under your hips.",
          "Extend one leg straight back, keeping your knee bent and your foot flexed.",
          "Slowly lower your hips towards the ground, feeling a stretch in your quads.",
          "Hold this position for 20-30 seconds.",
          "Switch legs and repeat the stretch on the other side."
      ]
  },
  {
      bodyPart: "waist",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/0006",
      id: "0006",
      name: "alternate heel touchers",
      target: "abs",
      secondaryMuscles: ["obliques"],
      instructions: [
          "Lie flat on your back with your knees bent and feet flat on the ground.",
          "Extend your arms straight out to the sides, parallel to the ground.",
          "Engaging your abs, lift your shoulders off the ground and reach your right hand towards your right heel.",
          "Return to the starting position and repeat on the left side, reaching your left hand towards your left heel.",
          "Continue alternating sides for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "back",
      equipment: "cable",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/0007",
      id: "0007",
      name: "alternate lateral pulldown",
      target: "lats",
      secondaryMuscles: ["biceps", "rhomboids"],
      instructions: [
          "Sit on the cable machine with your back straight and feet flat on the ground.",
          "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
          "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
          "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
          "Repeat for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "lower legs",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/1368",
      id: "1368",
      name: "ankle circles",
      target: "calves",
      secondaryMuscles: ["ankle stabilizers"],
      instructions: [
          "Sit on the ground with your legs extended in front of you.",
          "Lift one leg off the ground and rotate your ankle in a circular motion.",
          "Perform the desired number of circles in one direction, then switch to the other direction.",
          "Repeat with the other leg."
      ]
  },
  {
      bodyPart: "back",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/3293",
      id: "3293",
      name: "archer pull up",
      target: "lats",
      secondaryMuscles: ["biceps", "forearms"],
      instructions: [
          "Start by hanging from a pull-up bar with an overhand grip, slightly wider than shoulder-width apart.",
          "Engage your core and pull your shoulder blades down and back.",
          "As you pull yourself up, bend one arm and bring your elbow towards your side, while keeping the other arm straight.",
          "Continue pulling until your chin is above the bar and your bent arm is fully flexed.",
          "Lower yourself back down with control, straightening the bent arm and repeating the movement on the other side.",
          "Alternate sides with each repetition."
      ]
  },
  {
      bodyPart: "chest",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/3294",
      id: "3294",
      name: "archer push up",
      target: "pectorals",
      secondaryMuscles: ["triceps", "shoulders", "core"],
      instructions: [
          "Start in a push-up position with your hands slightly wider than shoulder-width apart.",
          "Extend one arm straight out to the side, parallel to the ground.",
          "Lower your body by bending your elbows, keeping your back straight and core engaged.",
          "Push back up to the starting position.",
          "Repeat on the other side, extending the opposite arm out to the side.",
          "Continue alternating sides for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "waist",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/2355",
      id: "2355",
      name: "arm slingers hanging bent knee legs",
      target: "abs",
      secondaryMuscles: ["shoulders", "back"],
      instructions: [
          "Hang from a pull-up bar with your arms fully extended and your knees bent at a 90-degree angle.",
          "Engage your core and lift your knees towards your chest, bringing them as close to your elbows as possible.",
          "Slowly lower your legs back down to the starting position.",
          "Repeat for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "waist",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/2333",
      id: "2333",
      name: "arm slingers hanging straight legs",
      target: "abs",
      secondaryMuscles: ["shoulders", "back"],
      instructions: [
          "Hang from a pull-up bar with your arms fully extended and your legs straight down.",
          "Engage your core and lift your legs up in front of you until they are parallel to the ground.",
          "Hold for a moment at the top, then slowly lower your legs back down to the starting position.",
          "Repeat for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "upper legs",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/3214",
      id: "3214",
      name: "arms apart circular toe touch (male)",
      target: "glutes",
      secondaryMuscles: ["hamstrings", "quadriceps", "calves"],
      instructions: [
          "Stand with your feet shoulder-width apart and arms extended to the sides.",
          "Keeping your legs straight, bend forward at the waist and reach down towards your toes with your right hand.",
          "As you reach down, simultaneously lift your left leg straight up behind you, maintaining balance.",
          "Return to the starting position and repeat the movement with your left hand reaching towards your toes and your right leg lifting up behind you.",
          "Continue alternating sides for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "waist",
      equipment: "body weight",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/3204",
      id: "3204",
      name: "arms overhead full sit-up (male)",
      target: "abs",
      secondaryMuscles: ["hip flexors", "lower back"],
      instructions: [
          "Lie flat on your back with your knees bent and feet flat on the ground.",
          "Extend your arms overhead, keeping them straight.",
          "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is upright.",
          "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
          "Repeat for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "chest",
      equipment: "leverage machine",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/0009",
      id: "0009",
      name: "assisted chest dip (kneeling)",
      target: "pectorals",
      secondaryMuscles: ["triceps", "shoulders"],
      instructions: [
          "Adjust the machine to your desired height and secure your knees on the pad.",
          "Grasp the handles with your palms facing down and your arms fully extended.",
          "Lower your body by bending your elbows until your upper arms are parallel to the floor.",
          "Pause for a moment, then push yourself back up to the starting position.",
          "Repeat for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "waist",
      equipment: "assisted",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/0011",
      id: "0011",
      name: "assisted hanging knee raise",
      target: "abs",
      secondaryMuscles: ["hip flexors"],
      instructions: [
          "Hang from a pull-up bar with your arms fully extended and your palms facing away from you.",
          "Engage your core muscles and lift your knees towards your chest, bending at the hips and knees.",
          "Pause for a moment at the top of the movement, squeezing your abs.",
          "Slowly lower your legs back down to the starting position.",
          "Repeat for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "waist",
      equipment: "assisted",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/0010",
      id: "0010",
      name: "assisted hanging knee raise with throw down",
      target: "abs",
      secondaryMuscles: ["hip flexors", "lower back"],
      instructions: [
          "Hang from a pull-up bar with your arms fully extended and your palms facing away from you.",
          "Engage your core and lift your knees towards your chest, keeping your legs together.",
          "Once your knees are at chest level, explosively throw your legs down towards the ground, extending them fully.",
          "Allow your legs to swing back up and repeat the movement for the desired number of repetitions."
      ]
  },
  {
      bodyPart: "lower legs",
      equipment: "assisted",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/1708",
      id: "1708",
      name: "assisted lying calves stretch",
      target: "calves",
      secondaryMuscles: ["hamstrings"],
      instructions: [
          "Lie on your back with your legs extended.",
          "Bend one knee and place your foot flat on the ground.",
          "Using your hands or a towel, gently pull your toes towards your body, feeling a stretch in your calf.",
          "Hold the stretch for 20-30 seconds.",
          "Release the stretch and repeat on the other leg."
      ]
  },
  {
      bodyPart: "upper legs",
      equipment: "assisted",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/1709",
      id: "1709",
      name: "assisted lying glutes stretch",
      target: "glutes",
      secondaryMuscles: ["hamstrings"],
      instructions: [
          "Lie on your back with your legs extended.",
          "Bend your right knee and place your right ankle on your left thigh, just above the knee.",
          "Grasp your left thigh with both hands and gently pull it towards your chest.",
          "Hold the stretch for 20-30 seconds.",
          "Release and repeat on the other side."
      ]
  },
  {
      bodyPart: "upper legs",
      equipment: "assisted",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/1710",
      id: "1710",
      name: "assisted lying gluteus and piriformis stretch",
      target: "glutes",
      secondaryMuscles: ["hamstrings"],
      instructions: [
          "Lie on your back with your legs extended.",
          "Bend your right knee and place your right ankle on your left thigh, just above the knee.",
          "Grasp your left thigh with both hands and gently pull it towards your chest.",
          "Hold the stretch for 20-30 seconds.",
          "Release the stretch and repeat on the other side."
      ]
  },
  {
      bodyPart: "waist",
      equipment: "assisted",
      gifUrl: "https://exercise-gif-api-989b2a8bed95.herokuapp.com/exercises/gif/0012",
      id: "0012",
      name: "assisted lying leg raise with lateral throw down",
      target: "abs",
      secondaryMuscles: ["hip flexors", "obliques"],
      instructions: [
          "Lie flat on your back with your legs extended and your arms by your sides.",
          "Place your hands under your glutes for support.",
          "Engage your abs and lift your legs off the ground, keeping them straight.",
          "While keeping your legs together, lower them to one side until they are a few inches above the ground.",
          "Pause for a moment, then lift your legs back to the starting position.",
          "Repeat the movement to the other side.",
          "Continue alternating sides for the desired number of repetitions."
      ]
  }
];


const AddExercise = ({ addExercise }) => {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedBodyPart, setSelectedBodyPart] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => { /*Since dataset is large and static I am fetching everything and then filtering*/
        const limit = 1600; //needs 1600+ to overwrite base limit 10
        const offset = 0; //not using due to not limiting dataset
        async function fetchExercises() {
            try {
                const response = await axiosExerciseDB.get(`/exercises?limit=${limit}&offset=${offset}`);
                setExercises(response?.data);
                setFilteredExercises(response?.data);
                console.log(JSON.stringify(response.data, null, 2));
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        }

        setExercises(tempExercises);
        setFilteredExercises(tempExercises);
        //fetchExercises();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = exercises.filter(exercise =>
                (selectedBodyPart ? exercise.bodyPart === selectedBodyPart : true) &&
                (exercise.name.toLowerCase().includes(searchQuery) ||
                    exercise.bodyPart.toLowerCase().includes(searchQuery) ||
                    exercise.equipment.toLowerCase().includes(searchQuery) ||
                    exercise.target.toLowerCase().includes(searchQuery))
            );
            setFilteredExercises(filtered);
        };

        applyFilters();
    }, [exercises, selectedBodyPart, searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query.trim().toLowerCase());
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='add-exercise-container'>
            <div id="search-container">
                <button onClick={toggleDropdown} id="body-part-button" className={isDropdownOpen ? 'open' : ''}>
                    {isDropdownOpen ? <FaCaretDown /> : <FaCaretRight />}
                </button>
                <SearchBar onSearch={handleSearch} />
            </div>
            {isDropdownOpen && <BodyPartSelector selected={selectedBodyPart} selectBodyPart={(bodyPart) => setSelectedBodyPart(bodyPart)} />} {/* Body Part Selector */}
            <ExerciseList exercises={filteredExercises} addExercise={(exercise) => addExercise(exercise)} /> {/*add exercise list*/}
        </div>
    );
}

export default AddExercise;