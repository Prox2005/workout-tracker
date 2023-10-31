import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { BackBtn } from "../../components/index";

const Details = () => {
  const [exercises, setExercises] = useState();
  const { workoutName } = useParams();
  useEffect(() => {
    const getExercises = async () => {
      const collectionRef = collection(db, workoutName);
      let array = [];
      const data = await getDocs(collectionRef).then((querySnapshot) => {
        querySnapshot.docs.map((doc) => array.unshift(doc.data()));
      });
      setExercises(array);
    };

    getExercises();
  }, []);
  return (
    <div className="workout-details">
      <BackBtn />
      <div>
        <h1>{workoutName} Workout Exercises</h1>
        <ol>
          {exercises &&
            exercises.map((exercise, key) => (
              <li key={key}>
                {exercise.name} Sets: {exercise.sets} Reps: {exercise.reps}
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Details;
