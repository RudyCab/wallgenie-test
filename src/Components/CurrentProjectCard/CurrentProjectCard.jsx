import React from "react";
import "./CurrentProjectCard.css";
import hardCodedCurrentImage from "./hardCodedCurrent.png";

function CurrentProjectCard({ imagePath }) {
  return (
    <div className="current-project-card">
      <img src={hardCodedCurrentImage} alt="Current Project Image" />
      <span>Project Spotlight</span>
    </div>
  );
}

export default CurrentProjectCard;
