import React from "react";
import "./GalleryGrid.css";
import { IoCloseCircleSharp } from "react-icons/io5";

function GalleryGrid({ images, handleDelete }) {
  return (
    <div className="decorGrid-container">
      <ul className="decorGrid">
        {images.map((imageUrl, index) => (
          <li key={index}>
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className={`decorItem ${
                index === images.length - 1 ? "lastDecorItem" : ""
              }`}
            />
            {/* Add a delete button/icon */}
            <IoCloseCircleSharp size={25} onClick={() => handleDelete(index)} className="deleteIcon" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GalleryGrid;
