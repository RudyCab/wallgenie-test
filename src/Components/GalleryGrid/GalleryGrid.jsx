import React from "react";
import "./GalleryGrid.css";

function GalleryGrid({ images }) {
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GalleryGrid;
