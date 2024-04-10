import React, { useState } from "react";
import Draggable from "./Draggable";
import "./Slider.css";

const Slider = ({ images, shuffle, setShuffle }) => {
  return (
    <>
      <div className="image-container">
        <div className="col">
          {images &&
            images.map((imageUrl, index) => (
              <Draggable
                img={imageUrl}
                alt={`Image ${index + 1}`}
                className="image"
                shuffle={shuffle}
                setShuffle={setShuffle}
              />
            ))}
        </div>
      </div>
      {/* SLIDER BACKGROUND */}
      <div
        style={{
          marginTop: 175,
          height: 260,
          width: "100%",
          background: "#265d5e",
          boxShadow: "inset 0 0 20px #0000001a",
        }}
      />
    </>
  );
};

export default Slider;
