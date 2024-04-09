import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import "./SettingsPopup.css";

const SettingsPopup = ({ alertDisplayed, setAlertDisplayed, setShuffle }) => {
  const [popupType, setPopupType] = useState(""); // shuffle, multiselect, upload, wall-settings

  return (
    <Popup
      trigger={
        <button className="settings-button" disabled={alertDisplayed}>
          <GiHamburgerMenu />
        </button>
      }
      position="bottom"
      closeOnDocumentClick={false}
      contentStyle={{ width: 53 }}
    >
      <Sidebar
        alertDisplayed={alertDisplayed}
        setAlertDisplayed={setAlertDisplayed}
        setPopupType={setPopupType}
        setShuffle={setShuffle}
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
    transform: "translate(-50%, -50%)",
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
  };

  const handleClose = () => {
    setAlertDisplayed(false);
  };

  let msg = "";
  switch (popupType) {
    case "shuffle":
      msg = "You decor items have been shuffled!";
      break;
    case "multiselect":
      msg = "Multiselect is now enabled!";
      break;
    case "upload":
      msg = "Visit the Decor Gallery page for more!";
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
