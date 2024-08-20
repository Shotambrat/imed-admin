"use client";
import React, { useState } from "react";
import Image from "next/image";
import editIcon from "@/public/svg/Radiobutton.svg";
import deleteIcon from "@/public/svg/close.svg";
import addIcon from "@/public/svg/questionsent.svg";
import LocationModal from "./LocationModal";
import axios from "axios";

const LocationDropdown = ({ locations, setLocations, selectedLocation, setSelectedLocation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [editingLocation, setEditingLocation] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openAddModal = () => {
    setModalMode("add");
    setEditingLocation(null);
    setIsModalOpen(true);
  };

  const openEditModal = (location) => {
    setModalMode("edit");
    setEditingLocation(location);
    setIsModalOpen(true);
  };

  const deleteLocation = async (locationId) => {
    try {
      await axios.delete(`http://213.230.91.55:8130/v1/location/${locationId}`);
      const updatedLocations = locations.filter((loc) => loc.id !== locationId);
      setLocations(updatedLocations);
      if (selectedLocation && selectedLocation.id === locationId) {
        setSelectedLocation(null);
      }
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="block mb-2 text-sm font-medium text-gray-700">Локация</label>
      <button
        onClick={toggleDropdown}
        className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-left"
      >
        {selectedLocation
          ? `${selectedLocation.country} - ${selectedLocation.city}`
          : "Выберите локацию"}
      </button>
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
          <div className="flex justify-end p-2">
            <button
              onClick={openAddModal}
              className="flex items-center text-green-500 hover:text-green-700"
            >
              <Image src={addIcon} alt="Add" width={16} height={16} className="mr-1" />
              Добавить локацию
            </button>
          </div>
          {locations.map((location) => (
            <div
              key={location.id}
              className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <span onClick={() => handleLocationSelect(location)}>
                {location.country} - {location.city}
              </span>
              <div className="flex items-center space-x-2">
                <button onClick={() => openEditModal(location)}>
                  <Image src={editIcon} alt="Edit" width={16} height={16} />
                </button>
                <button onClick={() => deleteLocation(location.id)}>
                  <Image src={deleteIcon} alt="Delete" width={16} height={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <LocationModal
          mode={modalMode}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          editingLocation={editingLocation}
          setLocations={setLocations}
          locations={locations}
        />
      )}
    </div>
  );
};

export default LocationDropdown;
