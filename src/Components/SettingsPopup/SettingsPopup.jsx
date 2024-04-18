import { useState } from "react";
import Popup from "reactjs-popup";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import "./SettingsPopup.css";
import "reactjs-popup/dist/index.css";

const SettingsPopup = ({ alertDisplayed, setAlertDisplayed, setShuffle, setClearAll, setWallEditorImportClicked, setImageUploadParam }) => {
  const [popupType, setPopupType] = useState(""); // shuffle, multiselect, upload, wall-settings

  return (
    <Popup
      trigger={
        <button className="settings-button" disabled={alertDisplayed}>
          <GiHamburgerMenu
            className={
              alertDisplayed ? "top-row-icon-disabled" : "top-row-icon-enabled"
            }
          />
        </button>
      }
      position="bottom"
      closeOnDocumentClick={false}
      contentStyle={{ width: 62.5 }}
    >
      <Sidebar
        alertDisplayed={alertDisplayed}
        setAlertDisplayed={setAlertDisplayed}
        setPopupType={setPopupType}
        setShuffle={setShuffle}
        setClearAll={setClearAll}
        setWallEditorImportClicked={setWallEditorImportClicked}
        setImageUploadParam={setImageUploadParam}
      />
      {alertDisplayed && (
        <Alert setAlertDisplayed={setAlertDisplayed} popupType={popupType} />
      )}
    </Popup>
  );
};

/* 
Keep Alert subcomponents in this file, or their styling gets messed up
*/
const Alert = ({ setAlertDisplayed, popupType }) => {
  const alertContainerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -80%)",
    backgroundColor: "rgba(254, 253, 249, 0.9)",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    padding: "30px 20px",
    width: "75%",
    borderRadius: "20px",
    textAlign: "center",
  };

  const buttonStyle = {
    backgroundColor: "#2A7676",
    color: "white",
    fontSize: "medium",
    marginTop: "7.5px",
    borderRadius: "10px",
    paddingTop: "3px",
    paddingBottom: "3px",
  };

  const handleClose = () => {
    setAlertDisplayed(false);
  };

  let msg = "";
  switch (popupType) {
    case "shuffle":
      break;
    case "upload":
      msg = "Add image upload functionality here";
      break;
    case "spotlight":
      msg = "Add spotlight functionality here";
      break;
    default:
      break;
  }

  return (
    <div className="alert" style={alertContainerStyle}>
      <h1 style={{ fontSize: "x-large" }}>{msg}</h1>
      <button style={buttonStyle} onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default SettingsPopup;
