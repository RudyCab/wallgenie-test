import React, { useState } from "react";
import Draggable from "./Draggable";
import "./Slider.css";

const Slider = ({ images, shuffle, setShuffle }) => {
  return (
    <>
      <div className="image-container">
        {/* Defines where DecorItems are first rendered on the WallEditorPAge */}
        <div className="col">
          {images &&
            images.map((imageUrl, index) => (
              <Draggable
                img={imageUrl}
                key={index}
                alt={`Image ${index + 1}`}
                className="image"
                shuffle={shuffle}
                setShuffle={setShuffle}
              />
            ))}
        </div>
      </div>
      {/* SLIDER BACKGROUND */}
      <div className="slider-background">
        <span id="slider-title">Decor Gallery</span>
      </div>
    </>
  );
};

export default Slider;
