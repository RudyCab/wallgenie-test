import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Home/HomePage";
import WallEditorPage from "./WallEditor/WallEditorPage";
import GalleryPage from "./Gallery/GalleryPage";
import ProjectsPage from "./Projects/ProjectsPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [importedImages, setImportedImages] = useState([]);
  const [wallEditorImportClicked, setWallEditorImportClicked] = useState(false)
  const [imageUploadParam, setImageUploadParam] = useState([])
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/wallgenie-test/" element={<HomePage />} />
          <Route
            path="/WallEditor"
            element={<WallEditorPage images={importedImages} 
            wallEditorImportClicked={wallEditorImportClicked}
            setWallEditorImportClicked={setWallEditorImportClicked}
            imageUploadParam={imageUploadParam}
            setImageUploadParam={setImageUploadParam}
            />}
          />
          <Route
            path="/Gallery"
            element={
              <GalleryPage
                importedImages={importedImages}
                setImportedImages={setImportedImages}
                wallEditorImportClicked={wallEditorImportClicked}
                setWallEditorImportClicked={setWallEditorImportClicked}
                imageUploadParam={imageUploadParam}
                setImageUploadParam={setImageUploadParam}
              />
            }
          />
          <Route path="/Projects" element={<ProjectsPage />} />
        </Routes>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
