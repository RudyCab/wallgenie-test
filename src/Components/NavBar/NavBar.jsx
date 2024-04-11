import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

import { FaImage } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";
import { ImPencil2 } from "react-icons/im";

function NavBar() {
  const location = useLocation();
  const ICON_MULTIPLIER = 1.1;

  const isWallEditorPage = location.pathname === "/WallEditor";
  if (isWallEditorPage) {
    return null;
  }

  return (
    <nav className="navbar">
      <ul>
        <li className={location.pathname === "/Gallery" ? "active" : ""}>
          <Link to="/Gallery">
            <FaImage size={30 * ICON_MULTIPLIER} />
          </Link>
        </li>
        <li
          className={location.pathname === "/wallgenie-test/" ? "active" : ""}
        >
          <Link to="/wallgenie-test/">
            <AiFillHome size={33.5 * ICON_MULTIPLIER} />
          </Link>
        </li>
        {/* <li className={location.pathname === "/WallEditor" ? "active" : ""}>
          <Link to="/WallEditor">
            <ImPencil2 size={28.5 * ICON_MULTIPLIER} />
          </Link>
        </li> */}
        <li className={location.pathname === "/Projects" ? "active" : ""}>
          <Link to="/Projects">
            <FaFolder size={30 * ICON_MULTIPLIER} style={{ marginTop: 2 }} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
