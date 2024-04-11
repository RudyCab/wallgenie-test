import React, { useState, useEffect } from "react";
import Draggable from "./Draggable";
import "./Carousel.css";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

/*
Now, acting as a carousel rather than a scrollable slider
*/
const Carousel = ({ images, shuffle, setShuffle }) => {
  const ITEMS_PER_PANEL = 6;
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  // effect to set the images for the current panel
  useEffect(() => {
    const startIndex = currentPanelIndex * ITEMS_PER_PANEL;
    const endIndex = startIndex + ITEMS_PER_PANEL;
    const panelImages = images.slice(startIndex, endIndex);
    setCurrentImages(panelImages);
  }, [currentPanelIndex, images]);

  // function to handle going to the previous panel
  const handlePrevPanel = () => {
    setCurrentPanelIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // function to handle going to the next panel
  const handleNextPanel = () => {
    const maxIndex = Math.ceil(images.length / ITEMS_PER_PANEL) - 1;
    setCurrentPanelIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const YELLOW = "#FDCE78";
  const TRANSPARENT_YELLOW = "#FDCE786a";

  return (
    <>
      {/* DISPLAY DECORITEMS */}
      <div className="DecorItem-Container">
        <ul className="DecorItem-Grid">
          {currentImages &&
            currentImages.map((imageUrl, index) => (
              <li key={index}>
                <Draggable
                  img={imageUrl}
                  key={index}
                  alt={`Image ${index + 1}`}
                  className="DecorItem"
                  shuffle={shuffle}
                  setShuffle={setShuffle}
                />
              </li>
            ))}
        </ul>
      </div>

      {/* CAROUSEL BACKGROUND (displayed beneath DecorItems) */}
      <div className="Carousel-Container">
        <button
          className="Carousel-Button Carousel-Left"
          onClick={handlePrevPanel}
        >
          <MdOutlineKeyboardArrowLeft
            color={currentPanelIndex === 0 ? TRANSPARENT_YELLOW : YELLOW}
          />
        </button>
        <span className="Carousel-Title">Decor Gallery</span>
        <button
          className="Carousel-Button Carousel-Right"
          onClick={handleNextPanel}
        >
          <MdOutlineKeyboardArrowRight
            color={
              currentPanelIndex ===
              Math.ceil(images.length / ITEMS_PER_PANEL) - 1
                ? TRANSPARENT_YELLOW
                : YELLOW
            }
          />
        </button>
      </div>
    </>
  );
};

export default Carousel;
