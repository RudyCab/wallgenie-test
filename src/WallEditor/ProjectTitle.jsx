import React, { useState } from "react";

const ProjectTitle = ({ alertDisplayed }) => {
  const [projectTitle, setProjectTitle] = useState("Untitled #1");
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleClick = () => {
    if (!alertDisplayed) {
      setIsEditing(true); // enable editing mode
    }
  };

  const handleInputChange = (event) => {
    setProjectTitle(event.target.value); // update project title
  };

  const handleInputBlur = () => {
    setIsEditing(false); // disable editing mode
    if (projectTitle.trim() === "") {
      // ensure that if user types an empty title, it'll defaul to "Untitled"
      setProjectTitle("Untitled");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleInputBlur();
    }
  };

  const MAX_VISIBLE_CHARS = 13;

  // if alert is being displayed, change title text color be a bit transparent
  const DEFAULT_COLOR = "#267a7a";
  let title_color = alertDisplayed ? DEFAULT_COLOR + "8c" : DEFAULT_COLOR;

  const projectTitleStyle = {
    position: "absolute",
    top: "10.75%",
    left: "50%",
    transform: "translate(-50%, -50%)", // center vertically
    // handles text overflow styling
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  return (
    <div className="project-title" style={projectTitleStyle}>
      {isEditing ? (
        <input
          type="text"
          value={projectTitle}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <h1
          onClick={handleTitleClick}
          style={{
            color: title_color,
            fontWeight: "bold",
          }}
        >
          {projectTitle.length > MAX_VISIBLE_CHARS
            ? projectTitle.substring(0, MAX_VISIBLE_CHARS) + "..."
            : projectTitle}
        </h1>
      )}
    </div>
  );
};

export default ProjectTitle;
