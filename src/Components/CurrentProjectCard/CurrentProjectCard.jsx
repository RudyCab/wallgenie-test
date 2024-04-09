import React from 'react';
import './CurrentProjectCard.css'; 
import hardCodedCurrentImage from './hardCodedCurrent.png'; 


function CurrentProjectCard({ imagePath }) {
    return (
      <div className="current-project-card">
        <img src={hardCodedCurrentImage} alt="Current Project Image" />
        <button>Current Project</button>
      </div>
    );
  }

export default CurrentProjectCard;