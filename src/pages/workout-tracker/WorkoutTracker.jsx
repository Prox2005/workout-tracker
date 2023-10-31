import React, { useState, useEffect } from "react";
import "./workout-tracker.css";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authInformation, db } from "../../config/firebase";
import { getDocs, collection, orderBy, query, where } from "firebase/firestore";
import WorkoutCard from "./WorkoutCard";

const WorkoutTracker = () => {
  const data = JSON.parse(localStorage.getItem("auth"));
  const { name, profilePhoto } = data;
  const navigate = useNavigate();

  const [workoutList, setWorkoutList] = useState([]);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        // a reference from firestore workouts collection
        const workoutsCollectionRef = collection(db, "workouts");
        //  ordering it by the date field
        const orderedCollectionRef = query(
          workoutsCollectionRef,
          orderBy("date", "asc"),
          where("userId", "==", data.userID)
        );
        const workoutsCollectionDocs = await getDocs(orderedCollectionRef);
        const filteredData = workoutsCollectionDocs.docs.map((doc) => doc.id);
        setWorkoutList(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    getWorkouts();
  }, []);

  const logUserOut = async () => {
    await signOut(authInformation);
    onAuthStateChanged(authInformation, (user) => {
      if (!user) {
        localStorage.clear();
        navigate("/");
      }
    });
  };

  return (
    <div className="app__workout-tracker">
      <div className="app__workout-tracker__user">
        <h1>Workout Tracker</h1>
        <button onClick={logUserOut}>Sign Out</button>
        <img src={profilePhoto} alt="profile picture" width="50px" height="50px" />
      </div>

      <div className="app__workout-tracker__workouts">
        <div>
          <h2>{name}'s Workout Tracker</h2>
          <button onClick={() => navigate("/workout-tracker/add-workout")}>Add New Workout</button>
        </div>
        <div className="app__workout-tracker__workouts-tracker">
          {workoutList.length > 0 ? (
            workoutList.map((workoutName, key) => (
              <WorkoutCard key={key} workoutName={workoutName} />
            ))
          ) : (
            <p style={{ textAlign: "center", fontSize: "20px" }}>Not Workouts added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;
