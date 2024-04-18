import React, { useState, useEffect } from "react";
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
  clearAll,
  setClearAll,
  xWall,
  yWall,
  widthWall,
  heightWall,
}) => {
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [sumWidths, setSumWidths] = useState([]);
  const [maxHeights, setMaxHeights] = useState([]);

  useEffect(() => {
    const calcDimensions = () => {
      const sumW = [];
      const hMax = [];

      let sumWidths = 0;

      // each row
      for (let i = 0; i < images.length; i += ITEMS_PER_ROW) {
        let rowMaxHeight = 0;
        sumWidths = 0;

        // each img in row
        for (let j = i; j < i + ITEMS_PER_ROW && j < images.length; j++) {
          const img = new Image();
          img.src = images[j];
          img.onload = () => {
            
            // for hd calculations
            if (j === 0 || j === 3) { // reset to 0 for 1st image of each row
              sumW.push(0);
              sumWidths = 0;
            } 
            if (j % ITEMS_PER_ROW !== ITEMS_PER_ROW - 1) { // skip adding 4th img width
              sumWidths = sumWidths + img.width;
              sumW.push(sumWidths);
            }
            
            // keep track of max height for vd calculations
            if (img.height > rowMaxHeight) {
              rowMaxHeight = img.height;
            }

            // stores max height for row
            if (j === i + ITEMS_PER_ROW - 1 || j === images.length - 1) {
              hMax.push(rowMaxHeight);
            }
          };
        }
      }

      setSumWidths(sumW);
      setMaxHeights(hMax);
    };

    calcDimensions();
  }, [images]);

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
                  clearAll={clearAll}
                  setClearAll={setClearAll}
                  xWall={xWall}
                  yWall={yWall}
                  widthWall={widthWall}
                  heightWall={heightWall}
                  sumWidths={sumWidths[index]}
                  maxHeightPrev={rowIndex > 0 ? maxHeights[rowIndex - 1] : 0}
                  maxHeights={maxHeights[Math.floor(index / ITEMS_PER_ROW)]}
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