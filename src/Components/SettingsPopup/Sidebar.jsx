// Sidebar Icons
import { TiArrowShuffle } from "react-icons/ti";
// import { LuLassoSelect } from "react-icons/lu";
import { RiImageAddFill } from "react-icons/ri";
// import { IoCameraOutline } from "react-icons/io5";
// import { MdOutlineSaveAlt } from "react-icons/md";
import { SiSpotlight } from "react-icons/si";
import { GiTrashCan } from "react-icons/gi";
// import { VscSettings } from "react-icons/vsc";
import { saveAs } from "file-saver";

import html2canvas from "html2canvas";

const Sidebar = ({
  alertDisplayed,
  setAlertDisplayed,
  setPopupType,
  setShuffle,
  setClearAll,
  setWallEditorImportClicked,
  setImageUploadParam
}) => {
  const types = ["shuffle", "clear-all", "spotlight"];
  const icons = [TiArrowShuffle, GiTrashCan, SiSpotlight];

  const handleOnClick = (e, type) => {
    if (type === 0) {
      setShuffle(true);
    } else if (type === 1) {
      // clear-all function
      setClearAll(true)
    } else if (type === 2) {
      // Specify the element or region to capture

      const wallComponentContainer = document.querySelector(".app-container");
      console.log("wall component ",wallComponentContainer )
      setSpotlight(wallComponentContainer);
    }
    setAlertDisplayed(true);
    setPopupType(types[type]);
  };

  const setSpotlight = (wallComponentContainer) => {
    // Capture the content of the specified element using html2canvas
    html2canvas(wallComponentContainer)
      .then((canvas) => {
        // Convert canvas to a data URL
        const dataURL = canvas.toDataURL();
        // Save the data URL to local storage
        localStorage.setItem("screenshot", dataURL);
        // setImagePath(dataURL);

        // Optionally, you can also download the screenshot
        saveAs(dataURL, "wallScreenshot.png");
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
      });
  };
  

  const handleOnChange = (e, type) => {
    console.log("HELLO")
    if (type == 1) {
      setWallEditorImportClicked(true)
      console.log(Array.from(e.target.files))
      setImageUploadParam(Array.from(e.target.files))
    }
  }

  return (
    <>
      <div className="sidebar-container">
        {icons.map((Icon, index) => (
          // index === 1 ? 
          //   (
          //   <span className="buttonContainer">
          //     <label htmlFor="file-input">
          //   <input
          //   id="file-input"
          //   type="file"
          //   accept="image/*"
          //   multiple
          //   style={{ display: "none" }}
          //   onChange={(e) => handleOnChange(Array.from(e.target.files))}
          // />
          // </label>
          // </span>
          // ) : 
          // (
          //   <button
          //   key={index}
          //   className={"sidebar-button"}
          //   onClick={(e) => handleOnClick(e, index)}
          //   disabled={alertDisplayed}
          // >
          //   <Icon
          //     className={
          //       alertDisplayed
          //         ? "sidebar-icon-disabled"
          //         : "sidebar-icon-enabled"
          //     }
          //     size={26}
          //   />
          // </button>
          // )

          <button
            key={index}
            className={"sidebar-button"}
            onClick={(e) => handleOnClick(e, index)}
            disabled={alertDisplayed}
          >
            <Icon
              className={
                alertDisplayed
                  ? "sidebar-icon-disabled"
                  : "sidebar-icon-enabled"
              }
              size={26}
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
