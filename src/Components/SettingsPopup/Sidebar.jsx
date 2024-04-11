// Sidebar Icons
import { TiArrowShuffle } from "react-icons/ti";
// import { LuLassoSelect } from "react-icons/lu";
import { RiImageAddFill } from "react-icons/ri";
// import { IoCameraOutline } from "react-icons/io5";
// import { MdOutlineSaveAlt } from "react-icons/md";
import { SiSpotlight } from "react-icons/si";
// import { VscSettings } from "react-icons/vsc";

const Sidebar = ({
  alertDisplayed,
  setAlertDisplayed,
  setPopupType,
  setShuffle,
}) => {
  const types = ["shuffle", "upload", "spotlight"];
  const icons = [TiArrowShuffle, RiImageAddFill, SiSpotlight];

  const handleOnClick = (type) => {
    if (type == 0) {
      setShuffle(true);
    } else {
      setAlertDisplayed(true);
      setPopupType(types[type]);
    }
  };

  return (
    <>
      <div className="sidebar-container">
        {icons.map((Icon, index) => (
          <button
            key={index}
            className={"sidebar-button"}
            onClick={() => handleOnClick(index)}
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
