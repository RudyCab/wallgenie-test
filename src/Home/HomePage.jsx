import { Link } from "react-router-dom";
import "./HomePage.css";
import React, { useEffect } from "react";
import logo from "../logo.png"; 
import CurrentProjectCard from "../Components/CurrentProjectCard/CurrentProjectCard" 

function HomePage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#215F5F";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div>
      <img src={logo} alt="logo of name and genie lamp" />
      <div className="homepage-button-container">
      <CurrentProjectCard 
          imagePath="path_to_your_current_project_image"
        />        <Link to="/WallEditor">
          <button className="homepage-buttons">New Project</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
