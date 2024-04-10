import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { IoIosArrowBack } from "react-icons/io";
import SettingsPopup from "../Components/SettingsPopup/SettingsPopup";
import WallComponent from "../Components/Wall/WallComponent";
import ProjectTitle from "../Components/ProjectTitle/ProjectTitle";
import Slider from "./Slider";
import { Wall } from "../Structs/Wall";
import Colors from "./Colors";
import "./WallEditorPage.css";
import "bootstrap/dist/css/bootstrap.css";

function WallEditorPage({ images }) {
  let themeColor = "#ffffff";
  const metaTag = document.querySelector("#theme-color-meta");
  if (metaTag) {
    metaTag.setAttribute("content", themeColor);
  }

  const [shuffle, setShuffle] = useState(false);

  const [alertDisplayed, setAlertDisplayed] = useState(false);
  const parentRef = useRef(null);

  // back button navigation
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const __DISPLAY_SLIDER = true; // for debugging purposes

  // Wall Constants
  let PADDING = 17.5;
  const MAX_WIDTH = 350;

  const wall_width = Math.min(window.innerWidth - 2 * PADDING, MAX_WIDTH);

  let x = PADDING; // assume phone screen, therefore place wall x-val @ 20px
  if (wall_width === MAX_WIDTH) {
    // laptop screen, ensures wall is still vertically aligned
    x = (window.innerWidth - MAX_WIDTH) / 2;
    PADDING = (window.innerWidth - MAX_WIDTH) / 2;
  }

  /*
  Create new `Wall` instance
  */
  const wall = new Wall(
    { x: x, y: window.innerHeight * 0.25 - 20 },
    {
      width: wall_width,
      height: (3 / 4) * wall_width,
    },
    {
      borderColor: "black",
      borderWidth: 2,
    },
    [],
    { PADDING: PADDING, MAX_WIDTH: MAX_WIDTH } // constants
  );

  const [wallColor, setWallColor] = useState("#e8e4e4");
  // const [wallTexture, setWallTexture] = useState("plain");
  // const [isTextured, setIsTextured] = useState(false);

  const ColorDropdownItem = ({ color }) => {
    return (
      <Dropdown.Item
        as="button"
        onClick={() => setWallColor(color)}
        style={{ backgroundColor: color }}
      >
        <span style={{ color: color }}>.</span>
      </Dropdown.Item>
    );
  };

  const dropdownButtonStyle = {
    position: "fixed",
    top: wall.coordinates.y - 44,
    left: "50%",
    transform: "translateX(-50%)",
  };

  let colors = [
    Colors.RED,
    Colors.ORANGE,
    Colors.YELLOW,
    Colors.GREEN,
    Colors.BLUE,
    Colors.PURPLE,
    Colors.WHITE,
    Colors.LIGHTGRAY,
    Colors.GRAY,
    Colors.TAN,
    Colors.BROWN,
    Colors.BLACK,
  ];

  return (
    <div className="wallEditor">
      <div className="page-container" style={{ pointerEvents: "auto" }}>
        <div ref={parentRef} className="top-row">
          <button
            className="back-button"
            disabled={alertDisplayed}
            onClick={handleBackButtonClick}
          >
            <IoIosArrowBack color="black" />
          </button>
          <ProjectTitle alertDisplayed={alertDisplayed} />
          <SettingsPopup
            alertDisplayed={alertDisplayed}
            setAlertDisplayed={setAlertDisplayed}
            setShuffle={setShuffle}
          />
        </div>

        {/* WALL COLOR DROPDOWN MENU */}
        <div className="dropdown-container" style={dropdownButtonStyle}>
          <DropdownButton
            drop="up-centered"
            title="Wall Color"
            variant="n/a"
            disabled={alertDisplayed}
          >
            <div className="dropdown-grid">
              {colors.map((color, index) => (
                <ColorDropdownItem color={color} key={index} />
              ))}
            </div>
          </DropdownButton>
        </div>

        {/* RENDER WALL COMPONENT */}
        <div className="wall-component-container" style={{ height: "350px" }}>
          <WallComponent wall={wall} wallColor={wallColor} />
        </div>

        {__DISPLAY_SLIDER && (
          <Slider images={images} shuffle={shuffle} setShuffle={setShuffle} />
        )}
      </div>
    </div>
  );
}

export default WallEditorPage;
