import React, { useEffect } from 'react';
import './ProjectPage.css'; 

import { FaFolder } from "react-icons/fa";
import { PiFolderPlus } from "react-icons/pi";

function ProjectPage() {
  useEffect(() => {
    document.body.style.backgroundColor = '#215F5F'; 
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
  
  return (
    <div>
      <div className='TopHeader'>
        <div className="projectText">
          <p>Projects</p>
        </div>
        <div className="buttonContainer">
          <button className="button">Select</button>
            <PiFolderPlus size={40}/>
        </div>
      </div>


      <div className="folderGrid-container">
        <ul className="folderGrid">
          <li className="folder">
            <FaFolder size={75} className="folder-icon" />
            <div className="folder-text">
              <span>Favorites</span>
            </div>
          </li>

          <li className="folder">
            <FaFolder size={75} className="folder-icon" />
            <div className="folder-text">
              <span>Coquette</span>
            </div>
          </li>     

          <li className="folder">
            <FaFolder size={75} className="folder-icon" />
            <div className="folder-text">
              <span>Minimalist</span>
            </div>
          </li>  
          <li className="folder">
            <FaFolder size={75} className="folder-icon" />
            <div className="folder-text">
              <span>Plant Mom</span>
            </div>
          </li>  
        </ul>
       </div>
    </div>

  );
}

export default ProjectPage;
