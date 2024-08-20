"use client";
import React, { useState } from "react";
import axios from "axios";

const languages = ["uz", "ru", "en"];

const LocationModal = ({ mode, isOpen, setIsOpen, editingLocation, setLocations, locations }) => {
  const [formData, setFormData] = useState(
    editingLocation || {
      country: {
        uz: "",
        ru: "",
        en: "",
      },
      city: {
        uz: "",
        ru: "",
        en: "",
      },
    }
  );

  const [activeLang, setActiveLang] = useState("ru");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [activeLang]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    const authFormData = new FormData();
    authFormData.append("username", "nasiniemsin");
    authFormData.append("password", "2x2=xx");

    const authResponse = await axios.post(
      "http://213.230.91.55:8130/v1/auth/login",
      authFormData
    );

    const token = authResponse.data.data.token;
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "add") {
        const response = await axios.post(
          "http://213.230.91.55:8130/v1/location",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLocations([...locations, response.data.data]);
      } else if (mode === "edit") {
        const response = await axios.put(
          "http://213.230.91.55:8130/v1/location",
          { id: editingLocation.id, ...formData }
        );
        const updatedLocations = locations.map((loc) =>
          loc.id === editingLocation.id ? response.data.data : loc
        );
        setLocations(updatedLocations);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting location:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">
            {mode === "add" ? "Добавить локацию" : "Редактировать локацию"}
          </h2>
          <div className="flex mb-4">
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Страна</label>
              <input
                type="text"
                value={formData.country[activeLang]}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Город</label>
              <input
                type="text"
                value={formData.city[activeLang]}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 mr-2 bg-gray-300 rounded"
                disabled={loading}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={loading}
              >
                {loading ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default LocationModal;
