import { Link } from "react-router-dom";
import "./HomePage.css";
import React, { useEffect, useState } from "react";
import logo from "../logo.png";
import CurrentProjectCard from "../Components/CurrentProjectCard/CurrentProjectCard";

function HomePage() {

  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    // Set background color
    document.body.style.backgroundColor = "#215F5F";
  
    // Function to handle changes in localStorage
    const handleStorageChange = () => {
      const storedImage = localStorage.getItem("screenshot");
      if (storedImage) {
        setImagePath(storedImage);
      }
    };
  
    // Add event listener to watch for changes in localStorage
    window.addEventListener("storage", handleStorageChange);
  
    // Initial check for the localStorage item
    handleStorageChange();
  
    // Cleanup: remove the event listener and reset background color
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.body.style.backgroundColor = "";
    };
  }, []);
  



  // useEffect(() => {
  //   document.body.style.backgroundColor = "#215F5F";
  //   return () => {
  //     document.body.style.backgroundColor = "";

  //     const storedImage = localStorage.getItem("screenshot");
      
  //     // Check if storedImage exists
  //     if (storedImage) {
  //       setImagePath(storedImage);
  //     }
  //   };
  // }, [localStorage.getItem("screenshot")]);

  // updates background color behind iPhone top notch
  let themeColor = "#215F5F";
  const metaTag = document.querySelector("#theme-color-meta");
  if (metaTag) {
    metaTag.setAttribute("content", themeColor);
  }

  return (
    <div>
      <img id="logo" src={logo} alt="logo of name and genie lamp" />
      <div className="homepage-button-container">
        <CurrentProjectCard imagePath={imagePath} />
        <Link to="/WallEditor">
          <button className="new-project-button">New Project</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
