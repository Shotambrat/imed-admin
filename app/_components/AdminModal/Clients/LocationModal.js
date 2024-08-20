"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const languages = ["uz", "ru", "en"];

const LocationModal = ({ mode, isOpen, setIsOpen, editingLocation, setLocations, locations }) => {
  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [activeLang, setActiveLang] = useState("ru");
  const [loading, setLoading] = useState(false);

  // Заполняем форму при редактировании
  useEffect(() => {
    if (editingLocation) {
      setFormData(editingLocation);
    } else {
      setFormData(initialFormData);
    }
  }, [editingLocation]);

  // Обработка изменений ввода для каждого языка отдельно
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [activeLang]: value,
      },
    }));
  };

  // Обработка сохранения локации
  const handleSave = async () => {
    const authFormData = new FormData();
    authFormData.append("username", "nasiniemsin");
    authFormData.append("password", "2x2=xx");

    try {
      const authResponse = await axios.post(
        "http://213.230.91.55:8130/v1/auth/login",
        authFormData
      );

      const token = authResponse.data.data.token;

      setLoading(true);
      let response;

      // Создаем объект для отправки, где все поля строковые
      const completeFormData = {
        id: editingLocation?.id,
        country: {
          uz: formData.country.uz || "",
          ru: formData.country.ru || "",
          en: formData.country.en || "",
        },
        city: {
          uz: formData.city.uz || "",
          ru: formData.city.ru || "",
          en: formData.city.en || "",
        },
      };

      if (mode === "add") {
        response = await axios.post(
          "http://213.230.91.55:8130/v1/location",
          completeFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLocations([...locations, response.data.data]);
      } else if (mode === "edit") {
        console.log(completeFormData)
        response = await axios.put(
          "http://213.230.91.55:8130/v1/location",
          completeFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedLocations = locations.map((loc) =>
          loc.id === editingLocation.id ? response.data.data : loc
        );
        setLocations(updatedLocations);
      }

      setIsOpen(false); // Закрываем модальное окно после сохранения
    } catch (error) {
      console.error("Error saving location:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return null; // Обработка случая, если formData пустая
  }

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
          <div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Страна</label>
              <input
                type="text"
                value={formData.country[activeLang] || ""}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Город</label>
              <input
                type="text"
                value={formData.city[activeLang] || ""}
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
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={loading}
              >
                {loading ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LocationModal;