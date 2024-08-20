"use client";
import React, { useState } from "react";
import LocationDropdown from "./LocationDropdown";
import LogoUploader from "./LogoUploader";
import GalleryUploader from "./GalleryUploader";

const ClientsInfo = ({
  activeItem,
  setActiveItem,
  languages,
  activeLang,
  setActiveLang,
  locations,
  fetchLocations,
}) => {
  const handleInputChange = (field, value) => {
    setActiveItem({
      ...activeItem,
      [field]: value,
    });
  };

  const handleDescriptionChange = (lang, value) => {
    setActiveItem({
      ...activeItem,
      description: {
        ...activeItem.description,
        [lang]: value,
      },
    });
  };

  const setSelectedLocation = (location) => {
    setActiveItem({
      ...activeItem,
      location: location,
    });
  };

  const setLogo = (logoFile) => {
    setActiveItem({
      ...activeItem,
      logo: logoFile,
    });
  };

  const setGallery = (galleryFiles) => {
    setActiveItem({
      ...activeItem,
      gallery: galleryFiles,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Информация о клиенте</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Название клиента</label>
          <input
            type="text"
            value={activeItem.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
            placeholder="Введите название клиента"
          />
        </div>
        <div className="mb-4">
          <div className="flex mb-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1 mr-2 rounded ${
                  activeLang === lang ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Описание</label>
          <textarea
            value={activeItem.description[activeLang]}
            onChange={(e) => handleDescriptionChange(activeLang, e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 h-32"
            placeholder="Введите описание клиента"
          />
        </div>
        <div className="mb-4">
          <LocationDropdown
            locations={locations}
            setLocations={fetchLocations}
            selectedLocation={activeItem.location}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
        <div className="mb-4">
          <LogoUploader logo={activeItem.logo} setLogo={setLogo} />
        </div>
        <div className="mb-4">
          <GalleryUploader gallery={activeItem.gallery} setGallery={setGallery} />
        </div>
      </div>
    </div>
  );
};

export default ClientsInfo;
