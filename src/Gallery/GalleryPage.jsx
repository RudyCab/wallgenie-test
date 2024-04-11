import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdAddPhotoAlternate } from "react-icons/md";
import GalleryGrid from "../Components/GalleryGrid/GalleryGrid";
import "./GalleryPage.css";
import { DecorItem } from "../Structs/DecorItem";

function GalleryPage({ importedImages, setImportedImages }) {
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

  /*
  If user refreshes the site, segue to '/wallgenie-test/' (homepage)
  before the refresh occurs. This is needed to avoid GitHub Pages
  error when user refreshes the site when they're not on the homepage
  */
  const navigate = useNavigate();
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      navigate("/wallgenie-test/");
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);

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

  return (
    <div>
      <div className="TopHeader">
        <p className="galleryText">Gallery</p>
        <span className="buttonContainer">
          {/* <button className="buttonSelect">Select</button> */}
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
      <GalleryGrid images={importedImages} />
    </div>
  );
}

export default GalleryPage;
