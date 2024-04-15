import React, { useState } from "react";
import Draggable from "./Draggable";
import "./Carousel.css";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const ITEMS_PER_ROW = 4;

/*
Now, acting as a carousel rather than a scrollable slider
*/
const Carousel = ({
  images,
  shuffle,
  setShuffle,
  xWall,
  yWall,
  widthWall,
  heightWall,
}) => {
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  // function to handle going to the previous panel
  const handlePrevPanel = () => {
    setCurrentPanelIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // function to handle going to the next panel
  const handleNextPanel = () => {
    const maxIndex = Math.ceil(images.length / ITEMS_PER_ROW) - 1;
    setCurrentPanelIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const rows = [];
  for (let i = 0; i < images.length; i += ITEMS_PER_ROW) {
    rows.push(images.slice(i, i + ITEMS_PER_ROW));
  }

  return (
    <>
      {/* DISPLAY DECORITEMS */}
      <div className="DecorItem-Container">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="DecorItem-Row">
              {row.map((imageUrl, index) => (
                <div key={index} className="DecorItem-Wrapper">
                <Draggable
                  img={imageUrl}
                  key={index}
                  alt={`Image ${index + 1}`}
                  className="DecorItem"
                  shuffle={shuffle}
                  setShuffle={setShuffle}
                  xWall={xWall}
                  yWall={yWall}
                  widthWall={widthWall}
                  heightWall={heightWall}
                  row={rowIndex}
                  col={index % ITEMS_PER_ROW}
                />
                </div>
              ))}
            </div>
          ))}
        {/* </ul> */}
      </div>

      {/* CAROUSEL BACKGROUND (displayed beneath DecorItems) */}
      <div className="Carousel-Container">
        <span className="Carousel-Title">Decor Gallery</span>
        <button
          className="Carousel-Button Carousel-Left"
          onClick={handlePrevPanel}
        >
          <MdOutlineKeyboardArrowLeft
            color={currentPanelIndex === 0 ? "transparent" : "#FDCE78"}
          />
        </button>
        <button
          className="Carousel-Button Carousel-Right"
          onClick={handleNextPanel}
        >
          <MdOutlineKeyboardArrowRight
            color={
              currentPanelIndex >=
              Math.ceil(images.length / (ITEMS_PER_ROW * ITEMS_PER_ROW)) - 1
                ? "transparent"
                : "#FDCE78"
            }
          />
        </button>
      </div>
    </>
  );
};

export default Carousel;