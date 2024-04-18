import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAddPhotoAlternate } from "react-icons/md";
import GalleryGrid from "../Components/GalleryGrid/GalleryGrid";
import "./GalleryPage.css";
import { DecorItem } from "../Structs/DecorItem";

function GalleryPage({ importedImages, setImportedImages, wallEditorImportClicked,  setWallEditorImportClicked, setImageUploadParam, imageUploadParam}) {
  useEffect(() => {
    document.body.style.backgroundColor = "#215F5F";

    // Load images from local storage
    const storedImages =
      JSON.parse(localStorage.getItem("importedImages")) || [];
    setImportedImages(storedImages);

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

  const handleImageUpload = (newImages) => {
    newImages.forEach((image, index) => {
      // Convert image to Base64 string
      const reader = new FileReader();
      reader.onload = () => {
        // Save the Base64 string to localStorage
        saveImageToLocalStorage(reader.result);
      };
      reader.readAsDataURL(image);
    });
    setWallEditorImportClicked(false)
  };

  const saveImageToLocalStorage = (imageData) => {
    const existingImages =
      JSON.parse(localStorage.getItem("importedImages")) || [];
    localStorage.setItem(
      "importedImages",
      JSON.stringify([...existingImages, imageData])
    );
    setImportedImages((prevImages) => [...prevImages, imageData]);
  };

  const handleDelete = (index) => {
    // Remove the image at the specified index
    const updatedImages = [...importedImages];
    updatedImages.splice(index, 1);
    // Update state
    setImportedImages(updatedImages);
    // Update localStorage
    localStorage.setItem("importedImages", JSON.stringify(updatedImages));
  };

  return (
    <div>
      {wallEditorImportClicked && handleImageUpload(imageUploadParam)}
      <div className="TopHeader">
        <p className="galleryText">Gallery</p>
        <span className="buttonContainer">
          <label htmlFor="file-input">
            <MdAddPhotoAlternate className="iconButton" />
            {/* Hidden file input to trigger file selection */}
            <input
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => handleImageUpload(Array.from(e.target.files))}
            />
          </label>
        </span>
      </div>
      <GalleryGrid images={importedImages} handleDelete={handleDelete}/>
    </div>
  );
}

export default GalleryPage;
