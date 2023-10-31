import { collection, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const WorkoutCard = ({ workoutName }) => {
  const [exercises, setExercises] = useState([]);
  const [workoutDate, setWorkoutDate] = useState();
  useEffect(() => {
    let workoutExercises = [];
    const getWorkoutData = async () => {
      const workoutDocumentRef = doc(db, "workouts", workoutName);
      const workoutCollectionRef = collection(db, workoutName);
      await getDocs(workoutCollectionRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          workoutExercises.push(doc.data());
        });
        setExercises(workoutExercises);
      });
      await getDoc(workoutDocumentRef).then((querySnapshot) => {
        const firebaseTimestamp = querySnapshot.data().date;
        const date = firebaseTimestamp.toDate();
        const formattedDate = date.toDateString();
        setWorkoutDate(formattedDate);
      });
    };

    getWorkoutData();
  }, [workoutName]);

  const handleRemove = async (workout) => {
    try {
      await deleteDoc(doc(db, "workouts", workout));
      const querySnapshot = await getDocs(collection(db, workout));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{workoutName} Workout </h1>
      <p>
        {workoutDate} ({exercises.length} exercises)
      </p>
      <Link to={`/workout-tracker/details/${workoutName}`}>More Details</Link>
      <AiFillDelete
        size={30}
        color="#f95959"
        cursor={"pointer"}
        onClick={() => handleRemove(workoutName)}
      />
    </div>
  );
};

export default WorkoutCard;
