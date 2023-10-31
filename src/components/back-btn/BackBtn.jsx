import React from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./back-btn.css";

const BackBtn = () => {
  const navigate = useNavigate();
  return <AiOutlineRollback id="back-btn" size={30} onClick={() => navigate("/workout-tracker")} />;
};

export default BackBtn;
