import React, { useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { IoIosArrowBack, IoMdAdd, IoMdClose } from "react-icons/io";
import SettingsPopup from "../Components/SettingsPopup/SettingsPopup";
import WallComponent from "../Components/Wall/WallComponent";
import Slider from "./Slider";
import { Wall } from "../Structs/Wall";
import Colors from "./Colors";
import "./WallEditorPage.css";
import "bootstrap/dist/css/bootstrap.css";

const __DISPLAY_SLIDER = true; // for debugging purposes

function WallEditorPage({ images }) {
  // updates background color behind iPhone top notch
  let themeColor = "#ffffff";
  const metaTag = document.querySelector("#theme-color-meta");
  if (metaTag) {
    metaTag.setAttribute("content", themeColor);
  }

  const [alertDisplayed, setAlertDisplayed] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const parentRef = useRef(null);

  // back button navigation
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  /*
  Initialize info for WallComponent
  */
  const MAX_WIDTH = 350;

  let PADDING = 17.5; // left, right padding for main wall

  const wall_width = Math.min(window.innerWidth - 2 * PADDING, MAX_WIDTH);

  let x = PADDING; // assuming phone screen, therefore placing wall x-val @ 17.5px
  if (wall_width === MAX_WIDTH) {
    // actually viewing on laptop, ensure wall is vertically aligned
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
    { PADDING: PADDING, MAX_WIDTH: MAX_WIDTH }
  );

  const ColorDropdownItem = ({ color }) => {
    // Helper function to generate colors within Dropdown
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

  /*
  Wall Color
  */
  const [wallColor, setWallColor] = useState("#e8e4e4");
  const [showColorPicker, setShowColorPicker] = useState(false);

  let default_colors = [
    Colors.RED,
    Colors.ORANGE,
    Colors.YELLOW,
    Colors.GREEN,
    Colors.BLUE,
    Colors.PURPLE,
    Colors.WHITE,
    Colors.GRAY,
    Colors.TAN,
    Colors.BROWN,
    Colors.BLACK,
  ];

  const handleOnCustomColorChange = (hexValue) => {
    setWallColor(hexValue);
  };

  /*
  Actually render the WallEditorPage...
  */
  return (
    <div className="wallEditor">
      <div className="page-container" style={{ pointerEvents: "auto" }}>
        <div ref={parentRef} className="top-row">
          {/* TOP ROW (back-button, title, settings) */}
          <button
            className="back-button"
            disabled={alertDisplayed}
            onClick={handleBackButtonClick}
          >
            <IoIosArrowBack
              className={
                alertDisplayed
                  ? "top-row-icon-disabled"
                  : "top-row-icon-enabled"
              }
            />
          </button>
          <ProjectTitle alertDisplayed={alertDisplayed} />
          <SettingsPopup
            alertDisplayed={alertDisplayed}
            setAlertDisplayed={setAlertDisplayed}
            setShuffle={setShuffle}
          />
        </div>

        {/* WALL COLOR DROPDOWN MENU */}
        <div
          className="dropdown-container"
          style={{
            position: "fixed",
            top: wall.coordinates.y - 44,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <DropdownButton
            drop="up-centered"
            title="Wall Color"
            variant="n/a"
            hidden={alertDisplayed}
            onToggle={(isOpen) => {
              if (!isOpen) {
                setShowColorPicker(false);
              }
            }}
          >
            <div className="dropdown-grid">
              {default_colors.map((color, index) => (
                <ColorDropdownItem color={color} key={index} />
              ))}
              {!showColorPicker ? (
                <IoMdAdd size={35} onClick={() => setShowColorPicker(true)} />
              ) : (
                <IoMdClose
                  size={35}
                  onClick={() => setShowColorPicker(false)}
                />
              )}
            </div>
          </DropdownButton>
        </div>

        {/* WALL COMPONENT */}
        <div className="wall-component-container" style={{ height: "350px" }}>
          <WallComponent wall={wall} wallColor={wallColor} />
        </div>

        {/* HEX COLOR PICKER (hidden by default) */}
        {showColorPicker && (
          <HexColorPicker
            id="HexColorPicker"
            color={wallColor}
            onChange={handleOnCustomColorChange}
            hidden={alertDisplayed}
          />
        )}

        {/* SLIDER (where DecorItems are displayed) */}
        {__DISPLAY_SLIDER && (
          <Slider images={images} shuffle={shuffle} setShuffle={setShuffle} />
        )}
      </div>
    </div>
  );
}

/*
HELPER COMPONENT
*/
const ProjectTitle = ({ alertDisplayed }) => {
  const [projectTitle, setProjectTitle] = useState("Untitled #1");
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleClick = () => {
    if (!alertDisplayed) {
      setIsEditing(true); // enable editing mode

      // fixed weird bug where clicking title reverts theme color
      // let themeColor = "#ffffff";
      // const metaTag = document.querySelector("#theme-color-meta");
      // if (metaTag) {
      //   metaTag.setAttribute("content", themeColor);
      // }
    }
  };

  const handleInputChange = (event) => {
    setProjectTitle(event.target.value); // update project title
  };

  const handleInputBlur = () => {
    setIsEditing(false); // disable editing mode
    if (projectTitle.trim() === "") {
      // ensure that if user types an empty title, it'll defaul to "Untitled"
      setProjectTitle("Untitled");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleInputBlur();
    }
  };

  const MAX_VISIBLE_CHARS = 13;

  // if alert is being displayed, change title text color be a bit transparent
  const DEFAULT_COLOR = "#267a7a";
  let title_color = alertDisplayed ? DEFAULT_COLOR + "8c" : DEFAULT_COLOR;

  const projectTitleStyle = {
    position: "absolute",
    top: "10.75%",
    left: "50%",
    transform: "translate(-50%, -50%)", // center vertically
    // handles text overflow styling
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  return (
    <div className="project-title" style={projectTitleStyle}>
      {isEditing ? (
        <input
          type="text"
          value={projectTitle}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <h1
          onClick={handleTitleClick}
          style={{
            color: title_color,
            fontWeight: "bold",
          }}
        >
          {projectTitle.length > MAX_VISIBLE_CHARS
            ? projectTitle.substring(0, MAX_VISIBLE_CHARS) + "..."
            : projectTitle}
        </h1>
      )}
    </div>
  );
};

export default WallEditorPage;
