import React, { useEffect } from "react";
import "./ProjectPage.css";

import { FaFolder } from "react-icons/fa";
import { RiFolderAddFill } from "react-icons/ri";

function ProjectPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#215F5F";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // updates background color behind iPhone top notch
  let themeColor = "#215F5F";
  const metaTag = document.querySelector("#theme-color-meta");
  if (metaTag) {
    metaTag.setAttribute("content", themeColor);
  }

  return (
    <div>
      <div className="TopHeader">
        <div className="projectText">
          <p>Projects</p>
        </div>
        <div className="buttonContainer">
          {/* <button className="button">Select</button> */}
          <RiFolderAddFill className="button-icon" />
        </div>
      </div>

      <div className="folderGrid-container">
        <ul className="folderGrid">
          <li className="folder">
            <FaFolder size={75} className="folder-icon" />
            <div className="folder-text">Favorites</div>
          </li>

          <li className="folder">
            <FaFolder size={75} className="folder-icon" />
            <div className="folder-text">Coquette</div>
          </li>

          <li className="folder">
            <FaFolder size={75} className="folder-icon" />
            <div className="folder-text">Minimalist</div>
          </li>
          <li className="folder">
            <FaFolder size={75} className="folder-icon" />
            <div className="folder-text">Plant Mom</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProjectPage;
