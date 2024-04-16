// Sidebar Icons
import { TiArrowShuffle } from "react-icons/ti";
// import { LuLassoSelect } from "react-icons/lu";
import { RiImageAddFill } from "react-icons/ri";
// import { IoCameraOutline } from "react-icons/io5";
// import { MdOutlineSaveAlt } from "react-icons/md";
import { SiSpotlight } from "react-icons/si";
import { GiTrashCan } from "react-icons/gi";
// import { VscSettings } from "react-icons/vsc";

const Sidebar = ({
  alertDisplayed,
  setAlertDisplayed,
  setPopupType,
  setShuffle,
  setWallEditorImportClicked,
  setImageUploadParam
}) => {
  const types = ["shuffle", "clear-all", "spotlight"];
  const icons = [TiArrowShuffle, GiTrashCan, SiSpotlight];

  const handleOnClick = (e, type) => {
    if (type == 0) {
      setShuffle(true);
    } else if (type == 1){
      // clear-all function
      
    } else {
      setAlertDisplayed(true);
      setPopupType(types[type]);
    }
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
