import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth, WorkoutTracker, AddWorkout } from "./pages/index";
import { useState } from "react";
import Details from "./pages/workout-tracker/Details";

function App() {
  const [collections, setCollections] = useState([]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/workout-tracker" element={<WorkoutTracker />} />
          <Route path="/workout-tracker/add-workout" element={<AddWorkout />} />
          <Route path="/workout-tracker/details/:workoutName" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
