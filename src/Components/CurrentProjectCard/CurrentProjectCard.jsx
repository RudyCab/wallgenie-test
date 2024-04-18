import React from "react";
import "./CurrentProjectCard.css";
import hardCodedCurrentImage from "./hardCodedCurrent.png";

function CurrentProjectCard({ imagePath }) {
  if (imagePath === "") {
    imagePath = hardCodedCurrentImage;
  }

  console.log("image path ", imagePath);

  return (
    <div className="current-project-card">
      <img src={imagePath} alt="Current Project Image" />
      <span>Project Spotlight</span>
    </div>
  );
}

export default CurrentProjectCard;
