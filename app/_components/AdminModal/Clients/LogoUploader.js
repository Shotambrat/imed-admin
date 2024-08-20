"use client";
import React, { useRef } from "react";
import Image from "next/image";
import uploadIcon from "@/public/svg/arrow-down-gray.svg";
import deleteIcon from "@/public/svg/close-gray.svg";

const LogoUploader = ({ logo, setLogo }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteLogo = () => {
    setLogo(null);
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">Логотип</label>
      {logo ? (
        <div className="flex items-center">
          <img
            src={URL.createObjectURL(logo)}
            alt="Logo Preview"
            className="w-32 h-32 object-contain border border-gray-300 rounded mr-4"
          />
          <button
            onClick={handleDeleteLogo}
            className="flex items-center text-red-500 hover:text-red-700"
          >
            <Image src={deleteIcon} alt="Delete" width={20} height={20} className="mr-2" />
            Удалить
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleUploadClick}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
          >
            <Image src={uploadIcon} alt="Upload" width={20} height={20} className="mr-2" />
            Загрузить логотип
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default LogoUploader;
