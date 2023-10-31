import React, { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { BackBtn } from "../../components/index";
import "./add-workout.css";

const AddWorkout = () => {
  const [exerciseInputs, setExerciseInputs] = useState([]);
  const [nextStep, setNextStep] = useState(false);
  const [inputs, setInputs] = useState({
    workoutName: "",
    exercises: [],
  });
  const navigate = useNavigate();

  // creates an input element
  const createInput = () => {
    // add a new array with a length equal to 3
    const exerciseArray = new Array(3);
    inputs.exercises.push(exerciseArray);

    setExerciseInputs([...exerciseInputs, { id: Date.now() }]);
    // shows the submit button after creating the input
    setNextStep(true);
  };

  // updating input value
  const handleInputChange = (property, index, value) => {
    const newData = { ...inputs };
    newData.exercises[index] = inputs.exercises[index];
    newData.exercises[index][property] = value;
    setInputs(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nextStep) {
      createInput();
      return;
    }

    // updating local storage object
    const auth = JSON.parse(localStorage.getItem("auth"));
    auth.exercises = inputs.exercises;

    const workoutRefDoc = setDoc(doc(db, "workouts", inputs.workoutName), {
      workoutName: inputs.workoutName,
      date: new Date(),
      userId: auth.userID,
    });

    auth.exercises.map(async (exercisesInfo) => {
      await setDoc(doc(db, inputs.workoutName, exercisesInfo[0]), {
        name: exercisesInfo[0],
        sets: exercisesInfo[1],
        reps: exercisesInfo[2],
        userId: auth.userID,
      });
    });

    navigate("/");
  };

  return (
    <div className="app__add-workout">
      <BackBtn />
      <h1>Add Your Workout Here :</h1>
      <form onSubmit={handleSubmit}>
        <div id="first-form">
          <label htmlFor="gym-day">Workout </label>
          <input
            type="text"
            id="gym-day"
            name="workoutSplit"
            placeholder="push,pull,legs ..."
            onChange={(e) => (inputs.workoutName = e.target.value)}
            required
          />
          <button type="button" onClick={createInput}>
            Add Exercises
          </button>
          {nextStep && <button type="submit">Submit</button>}
        </div>
        {exerciseInputs.map((input, index) => (
          <div id="second-form" key={input.id}>
            <label htmlFor={`exercise-name-${input.id}`}>Exercise Name : </label>
            <input
              type="text"
              id={`exercise-name-${input.id}`}
              name="exercise"
              required
              onChange={(e) => handleInputChange(0, index, e.target.value)}
            />

            <label htmlFor={`set-${input.id}`}>Sets : </label>
            <input
              id={`set-${input.id}`}
              type="number"
              min={1}
              name="exercise"
              required
              onChange={(e) => handleInputChange(1, index, e.target.value)}
            />

            <label htmlFor={`rep-${input.id}`}>Reps : </label>
            <input
              id={`rep-${input.id}`}
              type="number"
              min={1}
              name="exercise"
              required
              onChange={(e) => handleInputChange(2, index, e.target.value)}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default AddWorkout;
