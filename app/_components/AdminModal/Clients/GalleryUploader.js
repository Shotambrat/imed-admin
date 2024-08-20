"use client";
import React, { useRef } from "react";
import Image from "next/image";
import uploadIcon from "@/public/svg/arrow-down-gray.svg";
import deleteIcon from "@/public/svg/close-gray.svg";

const GalleryUploader = ({ gallery, setGallery }) => {
  const fileInputRef = useRef(null);

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setGallery([...gallery, ...files]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = (index) => {
    const updatedGallery = gallery.filter((_, i) => i !== index);
    setGallery(updatedGallery);
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">Галерея</label>
      <div className="flex flex-wrap gap-4 mb-4">
        {gallery.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`Gallery Image ${index + 1}`}
              className="w-32 h-32 object-cover border border-gray-300 rounded"
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
            >
              <Image src={deleteIcon} alt="Delete" width={16} height={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleUploadClick}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
      >
        <Image src={uploadIcon} alt="Upload" width={20} height={20} className="mr-2" />
        Добавить изображения
      </button>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFilesChange}
        className="hidden"
      />
    </div>
  );
};

export default GalleryUploader;
