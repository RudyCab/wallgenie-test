import React, { useState, useEffect } from 'react';
import { MdAddPhotoAlternate } from "react-icons/md";
import GalleryGrid from "../Components/GalleryGrid/GalleryGrid";
import './GalleryPage.css'; 
import { DecorItem } from '../Structs/DecorItem';

function GalleryPage({importedImages, setImportedImages}) {

  useEffect(() => {
    document.body.style.backgroundColor = '#215F5F'; 


    // Load images from local storage
    const storedImages = JSON.parse(localStorage.getItem('importedImages')) || [];
    setImportedImages(storedImages);

    return () => {
      document.body.style.backgroundColor = ''; 
    };
  }, []);

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
    const existingImages = JSON.parse(localStorage.getItem('importedImages')) || [];
    localStorage.setItem('importedImages', JSON.stringify([...existingImages, imageData]));
    setImportedImages(prevImages => [...prevImages, imageData]);
  }


  return (
    <div>
      <div className='TopHeader'>
        <div className="galleryText">
          <p>Gallery</p>
        </div>
        <div className="buttonContainer">
          <button className="buttonSelect">Select</button>
          <label htmlFor="file-input">
            <MdAddPhotoAlternate size={40} className="iconButton" />
            {/* Hidden file input to trigger file selection */}
            <input id="file-input" type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={(e) => handleImageUpload(Array.from(e.target.files))} />
          </label>
        </div>
      </div>
      <GalleryGrid images={importedImages} />
    </div>
  );
}

export default GalleryPage;